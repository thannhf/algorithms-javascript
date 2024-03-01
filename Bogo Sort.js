// Bogosort là một thuật toán sắp xếp được xem là "ngớ ngẩn" hay "ngu ngốc" do tính không hiệu quả của nó. Thuật toán hoạt động dựa trên nguyên tắc tạo ra các hoán vị ngẫu nhiên của mảng đầu vào cho đến khi tìm được một hoán vị đã được sắp xếp.

function bogosort(arr){
  // hàm kiểm tra xem mảng đã được sắp xếp hay chưa
  function isSorted(arr){
    for(let i = 1; i < arr.length; i++){
      if(arr[i - 1] > arr[i]){
        return false;
      }
    }
    return true;
  }
  // lặp lại cho đến khi mảng được sắp xếp
  while(!isSorted(arr)){
    // tạo ra một hoán vị ngẫu nhiên của mảng
    shuffle(arr);
  }
  return arr;
}
// hàm tạo ra một hoán vị ngẫu nhiên của mảng
function shuffle(arr){
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
// sử dụng:
const arr = [5,2,1,4,3];
console.log("mang ban dau:", arr);
const sortedArr = bogosort(arr);
console.log("mang sau khi sap xep:", sortedArr);
