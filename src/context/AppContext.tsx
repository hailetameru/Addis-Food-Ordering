import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '../lib/translations';

interface MenuItem {
  id: string;
  name: string;
  amName: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isAdminView: boolean;
  setIsAdminView: (view: boolean) => void;
  menuItems: MenuItem[];
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  addMenuItem: (item: Omit<MenuItem, 'id' | 'rating'>) => void;
  deleteMenuItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Doro Wat',
    amName: 'ዶሮ ወጥ',
    description: 'Spicy chicken stew with hard-boiled egg and traditional spices.',
    price: 350,
    category: 'stews',
    image: '/src/assets/images/regenerated_image_1778324456403.jpg',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Kitfo',
    amName: 'ክትፎ',
    description: 'Finely minced raw beef marinated in mitmita and niter kibbeh.',
    price: 450,
    category: 'meat',
    image: '/src/assets/images/regenerated_image_1778324574501.jpg',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Shiro Wat',
    amName: 'ሽሮ ወጥ',
    description: 'Delicious chickpea flour stew, a vegetarian favorite.',
    price: 180,
    category: 'vegetarian',
    image: '/src/assets/images/regenerated_image_1778324688617.jpg',
    rating: 4.7
  },
  {
    id: '4',
    name: 'Tibs',
    amName: 'ጥብስ',
    description: 'Sautéed meat chunks with onions, peppers, and garlic.',
    price: 400,
    category: 'meat',
    image: '/src/assets/images/regenerated_image_1778325093162.jpg',
    rating: 4.8
  },
  {
    id: '5',
    name: 'Beyaynetu',
    amName: 'በያይነቱ',
    description: 'Assorted vegetarian stews served together on Injera.',
    price: 280,
    category: 'vegetarian',
    image: '/src/assets/images/regenerated_image_1778325174100.jpg',
    rating: 4.9
  },
  {
    id: '6',
    name: 'Ethiopian Coffee',
    amName: 'የኢትዮጵያ ቡና',
    description: 'Traditional wood-roasted coffee ceremony experience.',
    price: 50,
    category: 'coffee',
    image: '/src/assets/images/regenerated_image_1778325765325.jpg',
    rating: 5.0
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id' | 'rating'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      rating: 5.0
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider value={{
      language, setLanguage, t, cart, addToCart, removeFromCart, updateQuantity, clearCart, total,
      isCartOpen, setIsCartOpen, isAuthOpen, setIsAuthOpen, isAdminLoginOpen, setIsAdminLoginOpen, isAdminView, setIsAdminView,
      menuItems, updateMenuItem, addMenuItem, deleteMenuItem
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
