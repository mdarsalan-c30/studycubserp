import { useState } from "react";
import { Download, Send, Eye, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface OfferLetter {
  id: string;
  candidateName: string;
  position: string;
  salary: string;
  startDate: string;
  department: string;
  status: "draft" | "sent" | "accepted" | "declined";
}

interface OfferLetterModalProps {
  offer: OfferLetter;
  trigger: React.ReactNode;
}

const OfferLetterModal = ({ offer, trigger }: OfferLetterModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge className="status-inactive">Draft</Badge>;
      case "sent":
        return <Badge className="status-pending">Sent</Badge>;
      case "accepted":
        return <Badge className="status-active">Accepted</Badge>;
      case "declined":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              Offer Letter - {offer.candidateName}
            </DialogTitle>
            <div className="flex items-center space-x-2">
              {getStatusBadge(offer.status)}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Offer Letter Preview - Professional Format */}
        <div className="bg-white border-2 border-border rounded-lg p-12 mt-6 shadow-lg">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#20B2AA] to-[#17A2B8] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#20B2AA] to-[#F59E0B] bg-clip-text text-transparent">
                  Studycubs
                </h1>
                <p className="text-sm text-muted-foreground font-medium">Building future cubs at Studycubs</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-foreground font-semibold">Date: {new Date().toLocaleDateString('en-GB')}</p>
            </div>
          </div>

          {/* Letter Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground underline decoration-2 decoration-[#20B2AA]">
              LETTER OF {offer.position.toUpperCase()}
            </h2>
          </div>

          {/* Letter Body */}
          <div className="space-y-6 text-foreground leading-relaxed">
            <div>
              <p className="mb-4">
                <strong>Dear {offer.candidateName},</strong>
              </p>
            </div>

            <p>
              We would like to congratulate you on being selected for the <strong>"{offer.position}"</strong> position 
              at <strong>Studycubs</strong>. We are excited that you will join our team.
            </p>

            <p>
              The duration of this position will be <strong>3 Months</strong>, starting from{" "}
              <strong>{new Date(offer.startDate).toLocaleDateString('en-GB')}</strong> to{" "}
              <strong>{new Date(new Date(offer.startDate).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB')}</strong>. 
              With stipend (Based on performance). This position is an educational opportunity for you where your 
              main focus is on learning and developing new skills and gaining hands-on knowledge.
            </p>

            <p>
              We believe that you will perform all your tasks/projects as an intern, we expect you to perform 
              all assigned tasks to the best of your ability and follow any relevant and reasonable instructions 
              provided to you. We have implemented a <strong>work-from-home</strong> arrangement for this position.
            </p>

            <p>
              We are confident that this position will be a valuable experience for you, we look forward to 
              working with you and helping you achieve your career goals.
            </p>

            <div className="mt-8">
              <p className="mb-2"><strong>Best of Luck!</strong></p>
              <p><strong>Thank You!</strong></p>
            </div>

            {/* Offer Details Box */}
            <div className="bg-gradient-to-r from-[#20B2AA]/10 to-[#17A2B8]/10 border-l-4 border-[#20B2AA] p-6 rounded-lg mt-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-muted-foreground">Position:</span>
                  <span className="ml-2 font-medium">{offer.position}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Department:</span>
                  <span className="ml-2 font-medium">{offer.department}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Salary/Stipend:</span>
                  <span className="ml-2 font-medium text-[#20B2AA]">{offer.salary}</span>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground">Start Date:</span>
                  <span className="ml-2 font-medium">{new Date(offer.startDate).toLocaleDateString('en-GB')}</span>
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="flex justify-between items-end mt-16 pt-8">
              <div>
                <div className="w-24 h-12 bg-muted-foreground/20 rounded mb-2 flex items-center justify-center cursor-pointer hover:bg-muted-foreground/30 transition-colors"
                     onClick={() => {
                       const input = document.createElement('input');
                       input.type = 'file';
                       input.accept = 'image/*';
                       input.onchange = (e) => {
                         const file = (e.target as HTMLInputElement).files?.[0];
                         if (file) {
                           const reader = new FileReader();
                           reader.onload = (e) => {
                             const img = document.createElement('img');
                             img.src = e.target?.result as string;
                             img.style.maxWidth = '100%';
                             img.style.maxHeight = '100%';
                             img.style.objectFit = 'contain';
                             const container = document.querySelector('.signature-container') as HTMLElement;
                             if (container) {
                               container.innerHTML = '';
                               container.appendChild(img);
                             }
                           };
                           reader.readAsDataURL(file);
                         }
                       };
                       input.click();
                     }}
                >
                  <span className="text-xs text-muted-foreground signature-container">Click to upload</span>
                </div>
                <p className="font-semibold text-foreground">Regards Founder,</p>
                <p className="text-foreground">Studycubs</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full border-4 border-[#20B2AA] flex items-center justify-center mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#20B2AA] to-[#17A2B8] flex items-center justify-center">
                    <span className="text-white font-bold text-sm">SC</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Official Seal</p>
              </div>
            </div>
          </div>

          {/* Company Footer */}
          <div className="mt-12 bg-gradient-to-r from-[#20B2AA] to-[#17A2B8] text-white p-6 rounded-lg">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-2">STUDYCUBS EDTECH PRIVATE LIMITED</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">📞 +91-9674948596</span>
                </div>
                <div>
                  <span className="font-medium">🌐 www.studycubs.com</span>
                </div>
                <div>
                  <span className="font-medium">📧 support@studycubs.com</span>
                </div>
              </div>
              <div className="mt-2 text-xs opacity-90">
                📍 Gee No-778, 1st Floor 2nd, Ullal Road, Residency, Haveli, Alandi Devachi, 412105, Maharashtra
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border">
          <Button variant="outline" className="btn-ghost">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button 
            className="btn-secondary"
            onClick={() => {
              // Generate PDF content
              const pdfContent = document.querySelector('.bg-white.border-2');
              if (pdfContent) {
                // Simple PDF generation using print
                const printWindow = window.open('', '_blank');
                printWindow?.document.write(`
                  <html>
                    <head>
                      <title>Offer Letter - ${offer.candidateName}</title>
                      <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                        .logo { width: 48px; height: 48px; background: linear-gradient(135deg, #20B2AA, #17A2B8); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 18px; }
                        .company-name { font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #20B2AA, #F59E0B); -webkit-background-clip: text; color: transparent; }
                        .title { text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; text-decoration: underline; }
                        .content { line-height: 1.6; margin: 20px 0; }
                        .details-box { background: #f0f9ff; border-left: 4px solid #20B2AA; padding: 15px; margin: 20px 0; }
                        .signature-section { display: flex; justify-content: space-between; margin-top: 40px; }
                        .footer { background: linear-gradient(90deg, #20B2AA, #17A2B8); color: white; padding: 20px; text-align: center; margin-top: 30px; }
                      </style>
                    </head>
                    <body>
                      ${pdfContent.innerHTML}
                      <script>window.print(); window.close();</script>
                    </body>
                  </html>
                `);
                printWindow?.document.close();
              }
            }}
          >
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button 
            className="btn-primary"
            onClick={() => {
              // Send offer functionality
              alert(`Offer letter for ${offer.candidateName} has been sent successfully!`);
            }}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Offer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfferLetterModal;