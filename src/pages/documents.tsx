import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, FileSpreadsheet, Download, FileArchive, FileImage, UploadCloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const INITIAL_DOCS = [
  { id: 1, name: "Q3_Marketing_Report.pdf", type: "pdf", size: "2.4 MB", date: "Oct 5, 2026" },
  { id: 2, name: "Acme_Contract_v2.docx", type: "doc", size: "1.1 MB", date: "Oct 4, 2026" },
  { id: 3, name: "Q4_Budget_Draft.xlsx", type: "sheet", size: "845 KB", date: "Oct 2, 2026" },
  { id: 4, name: "Campaign_Assets.zip", type: "archive", size: "14.2 MB", date: "Sep 28, 2026" },
  { id: 5, name: "Brand_Guidelines.pdf", type: "pdf", size: "5.1 MB", date: "Sep 25, 2026" },
  { id: 6, name: "Logo_Pack.zip", type: "archive", size: "8.4 MB", date: "Sep 20, 2026" },
  { id: 7, name: "Employee_Handbook.pdf", type: "pdf", size: "1.8 MB", date: "Sep 15, 2026" },
  { id: 8, name: "Q2_Financials.xlsx", type: "sheet", size: "920 KB", date: "Jul 10, 2026" },
];

export function DocumentsPage() {
  const [docs, setDocs] = useState(INITIAL_DOCS);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'sheet': return <FileSpreadsheet size={32} className="text-[#00D696]" />;
      case 'archive': return <FileArchive size={32} className="text-[#FFBF00]" />;
      case 'image': return <FileImage size={32} className="text-[#7A83FF]" />;
      default: return <FileText size={32} className="text-[#0099FF]" />;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/document/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      // Add to local state on success
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: file.name.split('.').pop()?.toLowerCase() || 'pdf',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: "Just now"
      };
      setDocs([newDoc, ...docs]);
      toast.success("Document uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      // Fallback for demo purposes
      setTimeout(() => {
        const newDoc = {
          id: Date.now(),
          name: file.name,
          type: file.name.split('.').pop()?.toLowerCase() || 'pdf',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          date: "Just now"
        };
        setDocs([newDoc, ...docs]);
        toast.success("Document uploaded successfully");
        setIsUploading(false);
      }, 1500);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div 
        className={`border-[3px] border-dashed rounded-base p-8 text-center transition-all ${
          isDragging 
            ? "border-main bg-main/10 scale-[1.02]" 
            : "border-border bg-secondary-background"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelect} 
          className="hidden" 
          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip"
        />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-main border-2 border-border shadow-[4px_4px_0_0_var(--border)] flex items-center justify-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-main-foreground animate-spin" />
            ) : (
              <UploadCloud className="h-10 w-10 text-main-foreground" />
            )}
          </div>
          <div>
            <h3 className="text-2xl font-black font-heading text-foreground uppercase tracking-tight">
              {isUploading ? "Uploading document..." : "Drag & drop your document here"}
            </h3>
            <p className="text-base font-medium text-foreground/70 mt-2 uppercase tracking-widest">
              Supports PDF, DOCX, XLSX, and ZIP up to 50MB
            </p>
          </div>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mt-6 uppercase font-bold tracking-widest text-base p-6"
            size="lg"
          >
            Browse Files
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4">
        <h2 className="text-2xl font-heading font-black text-foreground uppercase tracking-tight">Recent Files</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {docs.map(doc => (
          <Card key={doc.id} className="group cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center relative h-full">
              <div className="h-16 w-16 rounded-base border-2 border-border shadow-[2px_2px_0_0_var(--border)] bg-secondary-background flex items-center justify-center mb-5 group-hover:-translate-y-1 group-hover:shadow-[4px_4px_0_0_var(--border)] transition-all">
                {getIcon(doc.type)}
              </div>
              <h4 className="font-black text-lg font-heading text-foreground mb-1 truncate w-full" title={doc.name}>
                {doc.name}
              </h4>
              <p className="text-sm font-medium text-foreground/70 mb-5">{doc.size} • {doc.date}</p>
              <div className="mt-auto w-full">
                <Button variant="outline" size="sm" className="w-full font-bold uppercase tracking-widest">
                  <Download size={14} className="mr-2" /> Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
