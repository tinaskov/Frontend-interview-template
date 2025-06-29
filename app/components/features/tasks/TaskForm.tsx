import { useState, useCallback, memo } from "react";
import type { TaskFormData } from "../../../types";
import { Button } from "~/components/ui/Button/Button";
import { InputField } from "~/components/ui/InputField/InputField";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => Promise<boolean>;
  initialData?: TaskFormData;
}

export const TaskForm = memo(({ onSubmit, initialData }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>(initialData || { title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!formData.title.trim()) {
      alert("Title cannot be empty");
      return;
    }
    setIsSubmitting(true);
    const success = await onSubmit(formData);
    if (success && !initialData) {
      setFormData({ title: "", description: "" });
    }
    setIsSubmitting(false);
  }, [onSubmit, formData, initialData]);

  const handleInputChange = useCallback((field: keyof TaskFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  return (
    <div className='flex gap-2'>
      <InputField
        value={formData.title}
        onChange={e => handleInputChange("title", e.target.value)}
        placeholder={"Task title"}
        disabled={isSubmitting}
      />
      <InputField
        value={formData.description}
        onChange={e => handleInputChange("description", e.target.value)}
        placeholder='Description (optional)'
        disabled={isSubmitting}
      />
      <Button
        onClick={handleSubmit}
        label={isSubmitting ? "Adding..." : "Add"}
        disabled={!formData.title.trim() || isSubmitting}
        variant='contained'
      />
    </div>
  );
});
