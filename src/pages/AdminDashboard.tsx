import { useAuth } from "@/contexts/AuthContext";
import { useItemsStore } from "@/stores/itemsStore";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Shield, Trash2, Users, Package } from "lucide-react";

// Mock users list for admin view
const MOCK_ALL_USERS = [
  { id: "1", name: "Admin", email: "admin@collectify.com", role: "admin" },
  { id: "2", name: "Seller Demo", email: "seller@collectify.com", role: "seller" },
  { id: "3", name: "Buyer Demo", email: "buyer@collectify.com", role: "buyer" },
];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { items, removeItem } = useItemsStore();
  const { toast } = useToast();

  const handleDeleteItem = (id: string, name: string) => {
    removeItem(id);
    toast({ title: "Objet supprimé", description: `"${name}" a été retiré.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground">
            <Shield className="mr-2 inline h-7 w-7 text-teal" />
            Tableau de bord Admin
          </h1>
          <p className="mt-1 text-muted-foreground">
            Connecté en tant que {user?.name}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Users Section */}
          <section className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-card-foreground">
              <Users className="h-5 w-5 text-teal" />
              Utilisateurs ({MOCK_ALL_USERS.length})
            </h2>
            <div className="mt-4 space-y-2">
              {MOCK_ALL_USERS.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between rounded-lg border bg-background p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      {u.role}
                    </span>
                    {u.role !== "admin" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          toast({ title: "Demo", description: "Suppression simulée" })
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Items Section */}
          <section className="rounded-xl border bg-card p-6 shadow-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-card-foreground">
              <Package className="h-5 w-5 text-primary" />
              Objets ({items.length})
            </h2>
            <div className="mt-4 space-y-2 max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border bg-background p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(item.price)}
                      {" · "}
                      {item.sellerName}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0 text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteItem(item.id, item.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
