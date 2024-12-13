// React ve kullanmamız gereken hook'ları içe aktarıyoruz
import React, { useEffect, useState } from 'react';
// Axios kütüphanesini içe aktarıyoruz (API istekleri için)
import axios from 'axios';

// App adlı bir React bileşeni oluşturuyoruz
function App() {
  // Ürünleri tutmak için bir state tanımlıyoruz
  const [products, setProducts] = useState([]);
  // Yüklenme durumunu yönetmek için bir state tanımlıyoruz
  const [loading, setLoading] = useState(true);
  // Hata durumunu yönetmek için bir state tanımlıyoruz
  const [error, setError] = useState(null);

  // Bileşen ilk render edildiğinde çalışacak olan effect'i tanımlıyoruz
  useEffect(() => {
    // Asenkron fonksiyon tanımlıyoruz
    const fetchProducts = async () => {
      try {
        // API'den ürün verilerini çekiyoruz
        const response = await axios.get('https://fakestoreapi.com/products');
        // Çekilen veriyi state'e kaydediyoruz
        setProducts(response.data);
      } catch (error) {
        // Hata durumunda hatayı state'e kaydediyoruz
        setError(error);
      } finally {
        // Yüklenme durumunu false yapıyoruz (veri çekme tamamlandı)
        setLoading(false);
      }
    };

    // Asenkron fonksiyonu çağırıyoruz
    fetchProducts();
  }, []); // Boş bağımlılık dizisi, bu effect'in yalnızca bir kez çalışmasını sağlar

  // Eğer veriler yükleniyorsa bir yükleniyor mesajı döndürüyoruz
  if (loading) return <div>Loading...</div>;
  // Eğer bir hata varsa hatayı döndürüyoruz
  if (error) return <div>Error: {error.message}</div>;

  // Ürünler yüklendiyse, bileşenin ana JSX yapısını döndürüyoruz
  return (
    <div>
      <h1>Products</h1>
      <div>
        {products.map(product => ( // Ürünleri döngüye alıyoruz
          <div key={product.id}> {/* Her ürün için benzersiz bir anahtar kullanıyoruz */}
            <h2>{product.title}</h2> {/* Ürün başlığını gösteriyoruz */}
            <p>Price: ${product.price}</p> {/* Ürün fiyatını gösteriyoruz */}
            <img src={product.image} alt={product.title} style={{ width: '100%' }} /> {/* Ürün görselini gösteriyoruz */}
          </div>
        ))}
      </div>
    </div>
  );
}

// App bileşenini dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir
export default App;
