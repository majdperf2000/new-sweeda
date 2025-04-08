// FileUpload.tsx
import { useState } from 'react';
import { Button } from '../ui/button.js';
import { Input } from '../ui/input.js';

// 1. تجنب استخدام any بتعريف نوع مخصص للبيانات
interface UploadedFile {
  accept?: string;
  name: string;
  size: number;
  type: string;
}

interface FileUploadProps {
  onUpload: (file: UploadedFile) => void;
}

export const FileUpload = ({ onUpload }: FileUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  // 2. استخدم نوع UploadedFile بدلًا من any
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile({
        name: file.name,
        size: file.size,
        type: file.type,
      });
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Input type="file" onChange={handleFileChange} className="cursor-pointer" />
      {selectedFile && (
        <div>
          <p>الملف المختار: {selectedFile.name}</p>
          <p>الحجم: {(selectedFile.size / 1024).toFixed(2)} كيلوبايت</p>
        </div>
      )}
      <Button onClick={handleUpload} disabled={!selectedFile}>
        رفع الملف
      </Button>
    </div>
  );
};
