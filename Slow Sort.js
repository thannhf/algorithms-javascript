// Slow Sort - Thuật toán sắp xếp chậm
//SlowSort lấy cảm hứng từ chiến lược "divide and conquer" (chia để trị) giống như các thuật toán sắp xếp nhanh trước đó. Cách thực hiện của nó tương tự như quicksort là sẽ chia việc nhỏ ra để làm. Nhưng khác biệt là nó chia xong rồi lại lười biếng làm và mỗi khi bắt tay vào làm, lại chỉ làm một nửa công việc rồi lại tiếp tục "nghỉ ngơi".
//Thuật toán này hoạt động như sau:
//Chia mảng cần sắp xếp ra thành hai nửa.
//Dùng đệ quy sắp xếp từng nửa một cách... chậm rãi. (Ngược lại quick-sort)
//Sau đó nó tìm phần tử lớn nhất giữa hai nửa đã sắp xếp và chắc chắn rằng phần tử đó nằm ở vị trí cuối cùng của mảng. Bước này sẽ tìm được phần tử lớn nhất của từng nửa mảng. (Đây là bước duy nhất nó làm việc hơi bận rộn nhưng khá lâu vì sử dụng đệ quy).
//Cuối cùng, nó lại "quên" đi nửa mảng (chỉ nhớ mỗi phần tử lớn nhất vừa tìm ở trước trên và loại nó ra) và sắp xếp lại từ đầu.
//SlowSort không hề hiệu quả và thực sự rất chậm (đúng như tên gọi của nó) nhưng nó phản ánh khá nhiều góc nhìn trong thế giới thực, đặc biệt là được áp dụng vào đứa bị tag dưới bài viết này.

function slowSort(arr){
  if(arr.length <= 1){
    return arr;
  }
  let pivot = arr[0];
  let smaller = [];
  let larger = [];
  for(let i = 1; i < arr.length; i++){
    if(arr[i] < pivot){
      smaller.push(arr[i]);
    } else {
      larger.push(arr[i]);
    }
  }
  return slowSort(smaller).concat([pivot], slowSort(larger));
}
const arr = [3,1,4,1,5,9];
const sortedArr = slowSort(arr);
console.log(sortedArr);
