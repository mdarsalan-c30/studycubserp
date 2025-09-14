import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { 
  Search, 
  Filter, 
  Upload, 
  FileText, 
  File, 
  Image, 
  Download,
  MoreHorizontal,
  Folder
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getFileIcon = (fileType: string) => {
  if (fileType.toLowerCase().includes('image') || fileType.toLowerCase().includes('png') || fileType.toLowerCase().includes('jpg')) {
    return Image;
  }
  if (fileType.toLowerCase().includes('pdf')) {
    return FileText;
  }
  return File;
};

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { documents, isLoading, getDocumentStats } = useDocuments();
  
  const stats = getDocumentStats();
  const categories = [
    { name: "All", count: stats.total, color: "bg-primary" },
    ...stats.categories.map(cat => ({
      name: cat.name,
      count: cat.count,
      color: "bg-secondary"
    }))
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatFileSize = (size: string) => size;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Documents</h1>
            <p className="text-muted-foreground mt-1">
              Manage and organize all HR documents and files
            </p>
          </div>
          <Button className="btn-secondary">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading documents...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground mt-1">
            Manage and organize all HR documents and files
          </p>
        </div>
        <Button className="btn-secondary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
              selectedCategory === category.name
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-surface border border-border hover:bg-muted text-foreground"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${category.color}`}></div>
            <span className="font-medium">{category.name}</span>
            <Badge 
              className={`${
                selectedCategory === category.name 
                  ? "bg-white/20 text-primary-foreground" 
                  : "badge-accent"
              }`}
            >
              {category.count}
            </Badge>
          </button>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search documents by name, category, or uploader..."
            className="input-studycubs pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="btn-ghost">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" className="btn-ghost">
            <Folder className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDocuments.map((doc) => {
          const Icon = getFileIcon(doc.file_type);
          return (
            <div key={doc.id} className="card-studycubs group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge variant="secondary" className="text-xs">
                      {doc.file_type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem className="flex items-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Move to Folder</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {doc.name}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Size:</span>
                    <span>{formatFileSize(doc.file_size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <Badge className="badge-accent text-xs">
                      {doc.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Uploaded:</span>
                    <span>{doc.uploaded_at ? new Date(doc.uploaded_at).toLocaleDateString() : 'N/A'}</span>
                  </div>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="btn-ghost w-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== "All" 
              ? "Try adjusting your search or filter criteria."
              : "Upload your first document to get started."
            }
          </p>
          <Button className="btn-secondary">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>
      )}
    </div>
  );
};

export default Documents;