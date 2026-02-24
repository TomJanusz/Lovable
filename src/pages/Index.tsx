import { useItemsStore } from "@/stores/itemsStore";
import ItemCard from "@/components/ItemCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Shield, Package } from "lucide-react";

const Index = () => {
  const { items } = useItemsStore();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-accent/30">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-fade-in">
              Trouvez des{" "}
              <span className="bg-gradient-to-r from-gold-dark to-gold bg-clip-text text-transparent">
                trésors
              </span>{" "}
              de collection
            </h1>
            <p className="mt-4 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              La marketplace spécialisée dans les objets de collection, goodies
              vintage et pièces rares.
            </p>
            {!isAuthenticated && (
              <div className="mt-8 flex justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <Button variant="hero" size="lg" asChild>
                  <Link to="/register">Commencer maintenant</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">Se connecter</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Features strip */}
        <div className="border-t bg-card/50">
          <div className="container grid grid-cols-1 gap-0 divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              { icon: Search, title: "Découvrir", desc: "Des milliers d'objets rares" },
              { icon: Shield, title: "Sécurisé", desc: "Transactions protégées" },
              { icon: TrendingUp, title: "Investir", desc: "Objets à forte valeur" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 px-6 py-4">
                <Icon className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">
              <Package className="mr-2 inline h-6 w-6 text-primary" />
              Objets en vente
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {items.length} objet{items.length > 1 ? "s" : ""} disponible{items.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <div key={item.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <ItemCard item={item} />
            </div>
          ))}
        </div>

        {items.length === 0 && (
          <div className="py-16 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground/40" />
            <p className="mt-4 text-lg text-muted-foreground">Aucun objet en vente pour le moment</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Index;
