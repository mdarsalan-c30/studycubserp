// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Loader2 } from "lucide-react";
// import OfferLetterModal from "@/components/offers/OfferLetterModal";
// import CreateOfferModal from "@/components/forms/CreateOfferModal";
// import { useOfferLetters } from "@/hooks/useOfferLetters";
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Plus, 
//   Eye, 
//   Send, 
//   MoreHorizontal 
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const OfferLetters = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const { offerLetters, isLoading } = useOfferLetters();

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "draft":
//         return <Badge className="status-inactive">Draft</Badge>;
//       case "sent":
//         return <Badge className="status-pending">Sent</Badge>;
//       case "accepted":
//         return <Badge className="status-active">Accepted</Badge>;
//       case "declined":
//         return <Badge variant="destructive">Declined</Badge>;
//       default:
//         return <Badge variant="secondary">{status}</Badge>;
//     }
//   };

//   const filteredOffers = offerLetters.filter(offer =>
//     offer.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     offer.department.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
//             <p className="text-muted-foreground mt-1">
//               Create and manage job offer letters for candidates
//             </p>
//           </div>
//           <Button className="btn-primary">
//             <Plus className="h-4 w-4 mr-2" />
//             Create Offer
//           </Button>
//         </div>
//         <div className="flex items-center justify-center py-12">
//           <Loader2 className="h-8 w-8 animate-spin text-primary" />
//           <span className="ml-2 text-muted-foreground">Loading offer letters...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
//           <p className="text-muted-foreground mt-1">
//             Create and manage job offer letters for candidates
//           </p>
//         </div>
//         <CreateOfferModal />
//       </div>

//       {/* Search and Filters */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//           <Input 
//             placeholder="Search offers by candidate, position, or department..."
//             className="input-studycubs pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="flex space-x-2">
//           <Button variant="outline" className="btn-ghost">
//             <Filter className="h-4 w-4 mr-2" />
//             Filter
//           </Button>
//           <Button variant="outline" className="btn-ghost">
//             <Download className="h-4 w-4 mr-2" />
//             Export
//           </Button>
//         </div>
//       </div>

//       {/* Offers Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {filteredOffers.map((offer) => (
//           <div key={offer.id} className="card-studycubs">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="font-semibold text-foreground text-lg mb-1">
//                   {offer.candidate_name}
//                 </h3>
//                 <p className="text-sm text-muted-foreground">
//                   {offer.position}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 {getStatusBadge(offer.status || 'draft')}
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="ghost" size="sm">
//                       <MoreHorizontal className="h-4 w-4" />
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className="bg-card border-border">
//                     <DropdownMenuItem>Edit</DropdownMenuItem>
//                     <DropdownMenuItem>Duplicate</DropdownMenuItem>
//                     <DropdownMenuItem>Send Reminder</DropdownMenuItem>
//                     <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             <div className="space-y-3 mb-4">
//               <div className="flex justify-between">
//                 <span className="text-sm text-muted-foreground">Department:</span>
//                 <span className="text-sm font-medium text-foreground">{offer.department}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-muted-foreground">Salary:</span>
//                 <span className="text-sm font-medium text-primary">{offer.salary}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-muted-foreground">Start Date:</span>
//                 <span className="text-sm font-medium text-foreground">
//                   {new Date(offer.start_date).toLocaleDateString()}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-sm text-muted-foreground">Created:</span>
//                 <span className="text-sm font-medium text-foreground">
//                   {offer.created_date ? new Date(offer.created_date).toLocaleDateString() : 'N/A'}
//                 </span>
//               </div>
//             </div>

//             <div className="flex space-x-2">
//               <OfferLetterModal
//                 offer={{
//                   id: offer.id,
//                   candidateName: offer.candidate_name,
//                   position: offer.position,
//                   salary: offer.salary,
//                   startDate: offer.start_date,
//                   department: offer.department,
//                   status: (offer.status || 'draft') as "draft" | "sent" | "accepted" | "declined"
//                 }}
//                 trigger={
//                   <Button variant="outline" size="sm" className="btn-ghost flex-1">
//                     <Eye className="h-4 w-4 mr-2" />
//                     Preview
//                   </Button>
//                 }
//               />
//               {(offer.status || 'draft') === "draft" && (
//                 <Button size="sm" className="btn-secondary flex-1">
//                   <Send className="h-4 w-4 mr-2" />
//                   Send
//                 </Button>
//               )}
//               {offer.status === "sent" && (
//                 <Button size="sm" className="btn-primary flex-1">
//                   <Download className="h-4 w-4 mr-2" />
//                   Download
//                 </Button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Empty State */}
//       {filteredOffers.length === 0 && searchTerm && (
//         <div className="text-center py-12">
//           <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
//             <Search className="h-8 w-8 text-muted-foreground" />
//           </div>
//           <h3 className="text-lg font-semibold text-foreground mb-2">No offers found</h3>
//           <p className="text-muted-foreground">
//             Try adjusting your search terms or create a new offer letter.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OfferLetters;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, Filter, Download, Plus, Eye, Send, MoreHorizontal } from "lucide-react";
import OfferLetterModal from "@/components/offers/OfferLetterModal";
import CreateOfferModal from "@/components/forms/CreateOfferModal";
import { useOfferLetters } from "@/hooks/useOfferLetters";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const OfferLetters = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { offerLetters, isLoading } = useOfferLetters();

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

  const filteredOffers = offerLetters.filter(
    (offer) =>
      offer.candidate_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage job offer letters for candidates
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Offer
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">Loading offer letters...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Offer Letters</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage job offer letters for candidates
          </p>
        </div>
        <CreateOfferModal />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search offers by candidate, position, or department..."
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
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div key={offer.id} className="card-studycubs">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {offer.candidate_name}
                </h3>
                <p className="text-sm text-muted-foreground">{offer.position}</p>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(offer.status || "draft")}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-card border-border">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Department:</span>
                <span className="text-sm font-medium text-foreground">{offer.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Salary:</span>
                <span className="text-sm font-medium text-primary">{offer.salary}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Start Date:</span>
                <span className="text-sm font-medium text-foreground">
                  {new Date(offer.start_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium text-foreground">
                  {offer.created_date ? new Date(offer.created_date).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <OfferLetterModal
                offer={{
                  id: offer.id,
                  candidateName: offer.candidate_name,
                  position: offer.position,
                  salary: offer.salary,
                  startDate: offer.start_date,
                  department: offer.department,
                  status: (offer.status || "draft") as
                    | "draft"
                    | "sent"
                    | "accepted"
                    | "declined",
                }}
                trigger={
                  <Button variant="outline" size="sm" className="btn-ghost flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                }
              />
              {(offer.status || "draft") === "draft" && (
                <Button size="sm" className="btn-secondary flex-1">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              )}
              {offer.status === "sent" && (
                <Button size="sm" className="btn-primary flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOffers.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No offers found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or create a new offer letter.
          </p>
        </div>
      )}
    </div>
  );
};

export default OfferLetters;

