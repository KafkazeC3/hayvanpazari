'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, FolderTree } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string;
  isActive: boolean;
  _count: {
    listings: number;
    subcategories: number;
  };
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-earth-800">Kategoriler</h1>
          <p className="text-earth-500 mt-1">Kategori ve alt kategori yönetimi</p>
        </div>
        <Button className="gradient-nature gap-2">
          <Plus className="h-4 w-4" />
          Yeni Kategori
        </Button>
      </div>

      {/* Add Category Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Hızlı Kategori Ekle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input 
              placeholder="Kategori adı"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className="flex-1"
            />
            <Input 
              placeholder="Açıklama"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className="flex-1"
            />
            <Button className="gradient-nature">Ekle</Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-8">
            <div className="animate-spin h-8 w-8 border-2 border-nature-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : categories.length === 0 ? (
          <div className="col-span-2 text-center py-8 text-earth-500">
            Kategori bulunamadı
          </div>
        ) : (
          categories.map((category) => (
            <Card key={category.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-nature-100 flex items-center justify-center">
                      <FolderTree className="h-5 w-5 text-nature-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <p className="text-sm text-earth-500">{category.slug}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-earth-600 mb-4">{category.description}</p>
                <div className="flex items-center gap-4 text-sm text-earth-500">
                  <span>{category._count.listings} ilan</span>
                  <span>•</span>
                  <span>{category._count.subcategories} alt kategori</span>
                </div>
                
                {/* Subcategories */}
                {category.subcategories.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-earth-100">
                    <p className="text-sm font-medium text-earth-700 mb-2">Alt Kategoriler:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((sub) => (
                        <span 
                          key={sub.id} 
                          className="px-3 py-1 bg-earth-50 rounded-full text-sm text-earth-600"
                        >
                          {sub.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
