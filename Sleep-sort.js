function sleepsort(arr) {
  for(let i = 0; i < arr.length; i++){
    setTimeout(() => {
      console.log(arr[i]);
    }, arr[i]);
  }
}
const numbers = [5, 2, 4, 1, 3];
sleepsort(numbers);
