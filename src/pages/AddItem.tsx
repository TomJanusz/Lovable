import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useItemsStore } from "@/stores/itemsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ImagePlus } from "lucide-react";

const AddItem = () => {
  const { user } = useAuth();
  const { addItem } = useItemsStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addItem({
      name,
      description,
      price: parseFloat(price),
      image: image || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      sellerId: user.id,
      sellerName: user.name,
    });

    toast({ title: "Objet ajouté !", description: `"${name}" est maintenant en vente.` });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-lg py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Retour
        </button>

        <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
          <h1 className="font-display text-2xl font-bold text-card-foreground">
            <ImagePlus className="mr-2 inline h-6 w-6 text-primary" />
            Mettre en vente
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Ajoutez un objet de collection</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="name">Nom de l'objet</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Carte Pokémon Dracaufeu"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez l'état, la rareté, l'histoire..."
                rows={4}
                required
              />
            </div>
            <div>
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="99.99"
                required
              />
            </div>
            <div>
              <Label htmlFor="image">URL de l'image (optionnel)</Label>
              <Input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" size="lg">
              Publier l'objet
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
