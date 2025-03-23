import { Component, OnInit } from '@angular/core';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false,
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Elegant Dress', description: 'A beautiful evening dress perfect for special occasions.', price: 2999, category: 'Dress', imageUrl: '/assets/images/dress1.jpg' },
    { id: 2, name: 'Casual Shirt', description: 'Comfortable and stylish casual shirt for everyday wear.', price: 1499, category: 'Shirt', imageUrl: '/assets/images/shirt1.jpg' },
    { id: 3, name: 'Trendy Jeans', description: 'Slim-fit jeans with a modern design.', price: 1999, category: 'Jeans', imageUrl: '/assets/images/jeans1.jpg' },
    { id: 4, name: 'Designer Shoes', description: 'Premium quality shoes for a smart look.', price: 2499, category: 'Shoes', imageUrl: '/assets/images/shoes1.jpg' },
    { id: 5, name: 'Stylish Handbag', description: 'Elegant handbag to complete your outfit.', price: 1799, category: 'Accessories', imageUrl: '/assets/images/handbag1.jpg' },
    { id: 6, name: 'Floral Dress', description: 'Light and breezy floral dress for summer days.', price: 2599, category: 'Dress', imageUrl: '/assets/images/floral1.jpg' },
    { id: 7, name: 'Sporty Sneakers', description: 'Comfortable sneakers for a casual look.', price: 2199, category: 'Shoes', imageUrl: '/assets/images/sneaker1.jpg' },
    { id: 8, name: 'Leather Jacket', description: 'Classic leather jacket for a bold style.', price: 4999, category: 'Jackets', imageUrl: '/assets/images/jacket1.jpg' },
    { id: 9, name: 'Summer Shorts', description: 'Cool and comfy shorts for hot weather.', price: 999, category: 'Shorts', imageUrl: '/assets/images/shorts1.jpg' },
    { id: 10, name: 'Wrist Watch', description: 'Stylish wristwatch to complement your outfit.', price: 3499, category: 'Accessories', imageUrl: '/assets/images/watch1.jpg' },
    { id: 11, name: 'Aviator Sunglasses', description: 'Trendy sunglasses for a stylish look.', price: 1299, category: 'Accessories', imageUrl: '/assets/images/sunglasses1.jpg' },
    { id: 12, name: 'Denim Jacket', description: 'Trendy denim jacket for a rugged look.', price: 2799, category: 'Jackets', imageUrl: '/assets/images/denim1.jpg' },
    { id: 13, name: 'Formal Trousers', description: 'Perfect fit trousers for office and meetings.', price: 1899, category: 'Trousers', imageUrl: '/assets/images/trousers1.jpg' },
    { id: 14, name: 'Ethnic Kurta', description: 'Traditional kurta for festive occasions.', price: 2199, category: 'Ethnic Wear', imageUrl: '/assets/images/kurta1.jpeg' },
    { id: 15, name: 'Ankle Boots', description: 'Stylish boots to match your winter outfits.', price: 3499, category: 'Shoes', imageUrl: '/assets/images/boots1.jpeg' },
    { id: 16, name: 'Sports T-Shirt', description: 'Breathable and comfortable sportswear.', price: 999, category: 'T-Shirt', imageUrl: '/assets/images/sportstshirt1.jpg' },
    { id: 17, name: 'Silk Saree', description: 'Elegant silk saree for wedding functions.', price: 4999, category: 'Ethnic Wear', imageUrl: '/assets/images/saree1.jpeg' },
    { id: 18, name: 'Casual Hoodie', description: 'Warm hoodie for a cozy winter look.', price: 2999, category: 'Hoodies', imageUrl: 'assets/images/hoodie1.jpg' },
    { id: 19, name: 'Running Shoes', description: 'Lightweight shoes for running and workouts.', price: 2699, category: 'Shoes', imageUrl: 'assets/images/runningshoe1.jpg' },
    { id: 20, name: 'Slim Fit Blazer', description: 'Modern blazer for a smart and sharp look.', price: 5999, category: 'Blazers', imageUrl: '/assets/images/blazer1.jpg' }
  ];


  
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  suggestions: string[] = [];
  categories: string[] = [];
  selectedCategories: string[] = []; 
  sortOption: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 0;
  showFilters: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.categories = Array.from(new Set(this.products.map(p => p.category)));
    this.filteredProducts = this.products;
    this.calculateTotalPages();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearchChange(): void {
    if (this.searchTerm.trim()) {
      this.suggestions = this.products
        .filter(product => product.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        .map(product => product.name)
        .slice(0, 5);
    } else {
      this.suggestions = [];
    }
    this.applyFilters();
  }

  applyFilters(): void {
    let tempProducts = this.products;
    if (this.searchTerm.trim()) {
      tempProducts = tempProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    if (this.selectedCategories.length > 0) {
      tempProducts = tempProducts.filter(product =>
        this.selectedCategories.includes(product.category)
      );
    }
    tempProducts.sort((a, b) =>
      this.sortOption === 'asc' ? a.price - b.price : b.price - a.price
    );
    this.filteredProducts = tempProducts;
    this.currentPage = 1;
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.onSearchChange();
    this.suggestions = [];
  }

  toggleCategory(category: string): void {
    if (this.selectedCategories.includes(category)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    } else {
      this.selectedCategories.push(category);
    }
    this.applyFilters();
  }

  changeSort(option: 'asc' | 'desc'): void {
    this.sortOption = option;
    this.applyFilters();
  }
}
