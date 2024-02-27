/* Khi nói đến sắp xếp và thuật toán sắp xếp lười biếng nhất mọi thời đại chắc chắn là Sleep Sort Algorithm. Phần lớn các thuật toán sắp xếp phổ biến thường dùng phương pháp chia để trị, chia mảng thành các phần nhỏ hơn có thể sắp xếp. Tuy nhiên có một cách sắp xếp hiệu quả hơn, một thiên tài ngẫu nhiên trên forchan đã tìm ra cách tốt hơn nhưng nó hơi khác người.
Giống như tên gọi của nó, thuật toán này hoạt động bằng cách mở một luồng với mỗi phần tử và để chúng ngủ trong thời gian tỉ lệ thuận với giá trị của phần tử đó, rồi cuối cùng sau khi thức dậy nó in phần tử đó.
Thuật toán này thật tuyệt vời vì nó ủy quyền việc sắp xếp cho CPU, nhưng nó cũng thật ngu ngốc và vô dụng khi ủy quyền việc sắp xếp cho CPU :))*/

function sleepsort(arr) {
  for(let i = 0; i < arr.length; i++){
    setTimeout(() => {
      console.log(arr[i]);
    }, arr[i]);
  }
}
const numbers = [5, 2, 4, 1, 3];
sleepsort(numbers);
