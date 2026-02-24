// Mock items store for frontend - in production, connect to backend API
import { create } from "zustand";

export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: string;
}

interface ItemsState {
  items: Item[];
  addItem: (item: Omit<Item, "id" | "createdAt">) => void;
  removeItem: (id: string) => void;
  getSellerItems: (sellerId: string) => Item[];
}

// Sample collectible images (placeholder URLs)
const MOCK_ITEMS: Item[] = [
  {
    id: "1",
    name: "Carte Pokémon Dracaufeu 1ère Édition",
    description: "Carte holographique Dracaufeu de la première édition, état mint. Un classique incontournable pour tout collectionneur.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    name: "Figurine Star Wars Vintage Boba Fett",
    description: "Figurine originale Kenner de 1979, dans son emballage d'origine. Pièce de collection rare.",
    price: 450,
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-02-01T14:30:00Z",
  },
  {
    id: "3",
    name: "Vinyle The Beatles - Abbey Road (1969)",
    description: "Pressage original UK, pochette en excellent état. Son exceptionnel.",
    price: 320,
    image: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-01-20T09:15:00Z",
  },
  {
    id: "4",
    name: "Montre Casio G-Shock DW-5600 (1987)",
    description: "Modèle original de 1987, fonctionne parfaitement. Boîte et notice incluses.",
    price: 180,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-02-10T16:45:00Z",
  },
  {
    id: "5",
    name: "Console Nintendo NES + 2 Manettes",
    description: "Console NES en parfait état de fonctionnement avec 2 manettes d'origine et câbles.",
    price: 150,
    image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-01-28T11:00:00Z",
  },
  {
    id: "6",
    name: "Timbre Rare - Penny Black 1840",
    description: "Reproduction de qualité musée du premier timbre-poste au monde. Cadre inclus.",
    price: 75,
    image: "https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400&h=300&fit=crop",
    sellerId: "2",
    sellerName: "Seller Demo",
    createdAt: "2025-02-05T13:20:00Z",
  },
];

export const useItemsStore = create<ItemsState>((set, get) => ({
  items: MOCK_ITEMS,
  addItem: (item) =>
    set((state) => ({
      items: [
        {
          ...item,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        },
        ...state.items,
      ],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  getSellerItems: (sellerId) => get().items.filter((i) => i.sellerId === sellerId),
}));
