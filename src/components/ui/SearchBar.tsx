import SearchBar from './SearchBar.js';

// استخدام بسيط
<SearchBar />

// مع خصائص مخصصة
<SearchBar 
  placeholder="ابحث في المتجر..."
  className="my-4 max-w-2xl mx-auto"
  autoFocus={true}
  onSearch={(query) => console.log('بحث عن:', query)}
/>