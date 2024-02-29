/*
Khi Sinh học áp dụng vào Lập trình: Giải thuật di truyền - Genetic Algorithm dựa vào quá trình tiến hóa của mọi sinh vật trong vũ trụ
Có nhiều bạn hay đặt câu hỏi: Toán học được áp dụng nhiều vào lập trình. Vậy Hóa Học, Vật Lý, Sinh học,... thì như thế nào? Thực tế, có rất nhiều thuật toán được phát triển dựa trên các nguyên lý ở các lĩnh vực khoa học nói trên. Một trong những thuật toán dựa trên các nguyên lý di truyền trong sinh học, được áp dụng vào các bài toán tối ưu là "Giải thuật di truyền".
Giải thuật di truyền (GA) là một nhánh của thuật toán tối ưu hoá và tìm kiếm dựa trên nguyên lý lựa chọn tự nhiên của Darwin. Đây cũng là một trong những thuật toán có thể bạn sẽ học qua trong các môn học liên quan đến Trí Tuệ Nhân Tạo (AI). GA mô phỏng quá trình tiến hóa tự nhiên để tạo ra các giải pháp tối ưu cho bài toán. Các "sinh vật" ảo trong GA được biểu diễn qua chuỗi gen (thường là mảng hoặc string), và một hàm đánh giá "fitness" để xác định mức độ thích nghi với môi trường (bài toán). Ở đây làm cách việc diễn ra:
Khởi Tạo: Tạo ra một dân số ban đầu của các cá thể ngẫu nhiên.
Lựa Chọn: Đánh giá mức độ thích nghi của các cá thể và chọn ra những cá thể "mạnh" nhất.
Giao Phối (Crossover): Kết hợp gen của các cá thể đã chọn để tạo ra "con cái".
Đột Biến (Mutation): Đưa ra những thay đổi nhỏ trong các gen để duy trì đa dạng di truyền.
Lặp Lại: Quá trình này được lặp đi lặp lại qua nhiều thế hệ cho đến khi đạt được cá thể tối ưu hoặc sau một số thế hệ nhất định.
Thuật toán này không chỉ thú vị mà còn vô cùng mạnh mẽ, có thể áp dụng để giải quyết nhiều loại bài toán từ lập trình đến kinh tế và tâm lý học. Ví dụ, bạn muốn tạo ra một lược đồ màu sắc cho trang web? GA có thể giúp bạn tối ưu sự kết hợp màu sắc dựa trên nguyên tắc thẩm mỹ. Hoặc bạn muốn tối ưu hóa một đặc tính của một vật thể bay? GA cũng có thể giúp bạn "tiến hoá" ra thiết kế hoàn hảo nhất.
Nếu bạn muốn tìm đến một chút thách thức cho bản thân với một thuật toán vừa có tính ứng dụng, vừa có thể cho bạn những trải nghiệm thú vị đến từ quá trình tiến hóa, thì Genetic Algorithm chính là lựa chọn không thể tuyệt vời hơn!
*/
class individual{
  constructor(genes){
    this.genes = genes;
    this.fitness = 0;
  }

  evaluateFitness(){
    // tính toán giá trị thích nghi của cá thể
    // ví dụ bài toán TSP
    let totalDistance = 0;
    for(let i = 0; i < this.genes.length - 1; i++) {
      totalDistance += distanceMatrix[this.genes[i]][this.genes[i + 1]];
    }
    totalDistance += distanceMatrix[this.genes[this.genes.length - 1]][this.genes[0]];
    this.fitness = 1 / totalDistance;
  }

  mutate(){
    // biến đổi gen của cá thể 
    // ví dụ: Đảo ngược hai vị trí ngấu nhiên trong chuỗi gen
    const i = Math.floor(Math.random() * this.genes.length);
    const j = Math.floor(Math.random() * this.genes.length);
    const temp = this.genes[i];
    this.genes[i] = this.genes[j];
    this.genes[j] = temp;
  }

  crossover(otherIndividual){
    // lai ghép gen giữa các cá thể
    // ví dụ: lai ghép một điểm
    const crossoverPoint = Math.floor(Math.random() * this.genes.length);
    const offspring1 = new Individual(this.genes.slice(0, crossoverPoint).concat(otherIndividual.genes.slice(crossoverPoint)));
    const offspring2 = new Individual(otherIndividual.genes.slice(0, crossoverPoint).concat(this.genes.slice(crossoverPoint)));
    return [offspring1, offspring2];
  }
}

class Population {
  constructor(size){
    this.size = size;
    this.individuals = [];
    for(let i = 0; i < size; i++){
      this.individuals.push(new Individual(generateRandomPermutation(numberOfCities)));
    }
  }
  evaluate(){
    // đánh giá giá trị thích nghi của tất cả các cá thể trong quần thể
    for(let individual of this.individuals){
      individual.evaluateFitness();
    }
  }
  select(){
    // lựa chọn các cá thể tốt nhất để sinh sản
    // ví dụ: chọn lọc roulette
    const totalFitness = this.individuals.reduce((sum, individual)=>sum + individual.fitness, 0);
    const selectedIndividuals = [];
    for(let i = 0; i < this.size; i++){
      const randomNumber = Math.random() * totalFitness;
      let accumulatedFitness = 0;
      for(let j = 0; j < this.individuals.length; j++){
        accumulatedFitness += this.individuals[j].fitness;
        if(accumulatedFitness >= randomNumber){
          selectedIndividuals.push(this.individuals[j]);
          break;
        }
      }
    }
    return selectedIndividuals;
  }
  crossover(){
    // lai ghép gen giữa các cá thể được lựa chọn
    const selectedIndividuals = this.select();
    const offspring = [];
    for(let i = 0; i < selectedIndividuals.length; i += 2){
      offspring.push(...selectedIndividuals[i].crossover(selectedIndividuals[i+1]));
    }
    return offspring;
  }
  mutate(){
    // biến đổi gen của các cá thể con
    for(let offspring of this.offspring){
      offspring.mutate();
    }
  }
  replace(){
    // thay thế các cá thể cũ bằng các cá thể con
    this.individuals = this.individuals.concat(this.offspring);
    this.individuals.sort((a, b) => b.fitness - a.fitness);
    this.individuals = this.individuals.slice(0, this.size);
  }
}
class GeneticAlgorithm{
  constructor(populationSize, generations){
    this.populationSize = populationSize;
    this.generations = generations;
    this.population = new Population(populationSize);
  }
  run(){
    for(let i = 0; i < generations; i++){
      this.population.evaluate();
      const selectedIndividuals = this.population.select();
      const offspring = this.population.crossover();
      this.population.mutate(offspring);
      this.population.replace();
    }
    // lấy cá thể có giá trị thích nghi cao nhất
    return this.population.individuals.sort((a,b) => b.fitness - a.fitness)[0];
  }
}
// ví dụ sử dụng
const numberOfCities = 10;
const distanceMatrix = generateRandomDistanceMatrix(numberOfCities);
const ga = new GeneticAlgorithm(100, 100);
const bestIndividual = ga.run();
console.log("best individual:", bestIndividual.genes);
console.log("best tour length:",  1 / bestIndividual.fitness);
// hàm phụ trợ
function generateRandomPermutation(n) {
  const arr = Array.from({length: n}, (_, i) => i);
  arr.sort(() => Math.random() - 0.5);
  return arr;
}
function generateRandomDistanceMatrix(n){
  const matrix = new Array(n).fill(new Array(n).fill(0));
  for(let i = 0; i < n; i++){
    for(let j = i + 1; j < n; j++) {
      matrix[i][j] = Math.floor(Math.random() * 100) + 1;
      matrix[j][i] = matrix[i][j];
    }
  }
  return matrix;
}
