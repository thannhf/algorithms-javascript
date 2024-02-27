/*
  Giải thuật OCD... nhầm ACO - giải thuật đàn kiến áp dụng các bài toán tối ưu
Sinh học có áp dụng được vào tin học không? Đó là một câu hỏi mà nhiều bạn hỏi và trong bài viết này, mình giới thiệu đến bạn một thuật toán tối ưu có chút chút liên quan đến sinh học - Thuật toán ACO.
ACO là một giải thuật tối ưu hóa tổ hợp dựa trên hành vi tìm đường của đàn kiến. Nó thường được sử dụng để giải quyết các vấn đề tối ưu hóa NP-Hard, như bài toán người bán hàng (TSP), lập lịch và bối cảnh mạng được tạo ra đầu tiên trong luận án tiến sĩ của bác Marco Dorigo vào năm 1992 và dần hoàn thiện và có tên gọi là ACO do một vài bác khác optimize vào năm 1997.
Thuật toán này giống như hành vi của kiến khi chúng tìm kiếm đường di chuyển từ tổ đến nguồn thức ăn và ngược lại, thuật toán ACO sử dụng một số kiến nhân tạo để đi lại qua không gian vấn đề và tìm kiếm lời giải tối ưu. Kiến sẽ để lại một vệt pheromone dọc theo đường đi của chúng, giúp những con kiến sau đó có thể tìm đường ngắn hơn hoặc tốt hơn dựa vào những dấu hiệu mà con kiến trước để lại.
Trong ACO, các giải pháp được cải thiện dần dần thông qua một quá trình tìm kiếm song song và cộng tác. Pheromone sẽ cập nhật theo thời gian, tăng cường cho những đường đi tốt và giảm bớt đối với những con đường kém hiệu quả, qua đó hướng những con kiến tới lời giải tối ưu hơn. Đây là một cách tiếp cận dựa vào môn sinh học được mô phỏng vào giải thuật, cho thấy sự thông minh, linh hoạt và sức mạnh của thiên nhiên đối với các vấn đề tối ưu hóa phức tạp.
ACO là một công cụ tối ưu hóa mạnh mẽ và đa năng, thường xuyên được sử dụng để tìm kiếm lời giải tối ưu, nhất là trong các đề tài có không gian tìm kiếm rất lớn và phức tạp như:
Traveling Salesman Problem (TSP): Đây là bài toán cổ điển mà ACO được sử dụng để tìm đường đi ngắn nhất qua một tập các thành phố, mỗi thành phố chỉ được thăm một lần.
Lập Kế Hoạch Vận Chuyển và Lịch Trình: Áp dụng ACO để tối ưu hóa lộ trình của các phương tiện giao thông, từ xe tải đến máy bay, sao cho tổng hành trình là ngắn nhất và chi phí là thấp nhất.
Tối Ưu Hóa Mạng: ACO có thể được dùng để tìm đường dẫn tối ưu trong mạng viễn thông hoặc mạng máy tính, giúp cải thiện việc phân phối tải và giảm độ trễ.
Bài Toán Lược Đồ: Sử dụng ACO để tối ưu hóa bố cục và thiết kế của các mạch điện tử hoặc hệ thống lược đồ trong kỹ thuật.
Quản Lý Đối Tượng Đa Đích: ACO giúp cho việc phân bổ tài nguyên và lịch trình cho nhiều đối tượng cùng một lúc, như trong việc quản lý đường bay hay cổng dịch vụ.
Xử Lý Ảnh và Máy Học: Phân loại hình ảnh hoặc tối ưu hóa các mô hình máy học thông qua việc cải thiện các tham số và cấu trúc mạng.
Tối Ưu Hóa Các Quy Trình Sản Xuất: Nâng cao hiệu quả sản xuất bằng cách tối ưu hóa bố trí máy móc và lập lịch sản xuất.
Robotics: Giải quyết bài toán đường đi cho robot trong không gian lập trình sao cho tối ưu năng lượng và thời gian di chuyển.
Hy vọng chia sẻ này thú vị với bạn!
*/
class Ant {
  constructor(colony, graph) {
    this.colony = colony;
    this.graph = graph;
    this.tour = [];
    this.visited = new Array(graph.size).fill(false);
    this.currentCity = Math.floor(Math.random() * graph.size);
    this.visited[this.currentCity] = true;
    this.tour.push(this.currentCity);
  }
  chooseNextCity() {
    let probabilities = new Array(graph.size).fill(0);
    let totalProbability = 0;
    for (let i = 0; i < graph.size; i++) {
      if (!this.visited[i]) {
        probabilities[i] = this.colony.pheromoneMatrix[this.currentCity][i] * graph.adjacencyMatrix[this.currentCity][i];
        totalProbability += probabilities[i];
      }
    }
    let randomNumber = Math.random() * totalProbability;
    let chosenCity = -1;
    for (let i = 0; i < graph.size; i++) {
      if (!this.visited[i]) {
        randomNumber -= probabilities[i];
        if (randomNumber <= 0) {
          chosenCity = i;
          break;
        }
      }
    }
    return chosenCity;
  }
  constructTour() {
    while (this.tour.length < graph.size) {
      let nextCity = this.chooseNextCity();
      this.visited[nextCity] = true;
      this.tour.push(nextCity);
      this.currentCity = nextCity;
    }
  }
  evaluateTour() {
    let tourLength = 0;
    for (let i = 0; i < this.tour.length - 1; i++) {
      tourLength += graph.adjacencyMatrix[this.tour[i]][this.tour[i + 1]];
    }
    tourLength += graph.adjacencyMatrix[this.tour[this.tour.length - 1]][this.tour[0]];
    return tourLength;
  }
  updatePheromone() {
    for (let i = 0; i < this.tour.length - 1; i++) {
      this.colony.pheromoneMatrix[this.tour[i]][this.tour[i + 1]] += 1 / this.evaluateTour();
    }
    this.colony.pheromoneMatrix[this.tour[this.tour.length - 1]][this.tour[0]] += 1 / this.evaluateTour();
  }
}
class Colony {
  constructor(graph, numberOfAnts) {
    this.graph = graph;
    this.numberOfAnts = numberOfAnts;
    this.pheromoneMatrix = new Array(graph.size).fill(new Array(graph.size).fill(0.1));
    this.ants = [];
    for (let i = 0; i < numberOfAnts; i++) {
      this.ants.push(new Ant(this, graph));
    }
  }
  run() {
    for (let iteration = 0; iteration < 100; iteration++) {
      for (let ant of this.ants) {
        ant.constructTour();
        ant.updatePheromone();
      }
      this.evaporatePheromone();
      this.findBestAnt();
    }
  }
  evaporatePheromone() {
    for (let i = 0; i < this.pheromoneMatrix.length; i++) {
      for (let j = 0; j < this.pheromoneMatrix[i].length; j++) {
        this.pheromoneMatrix[i][j] *= 0.95;
      }
    }
  }

  findBestAnt() {
    let bestAnt = this.ants[0];
    for (let ant of this.ants) {
      if (ant.evaluateTour() < bestAnt.evaluateTour()) {
        bestAnt = ant;
      }
    }
    console.log(`Iteration ${iteration}: Best tour length: ${bestAnt.evaluateTour()}`);
  }
}
class Graph {
  constructor(size) {
    this.size = size;
    this.adjacencyMatrix = new Array(size).fill(new Array(size).fill(0));
  }

  addEdge(source, destination, weight) {
    this.adjacencyMatrix[source][destination] = weight;
    this.adjacencyMatrix[destination][source] = weight;
  }
}
// Ví dụ sử dụng
const graph = new Graph(4);
graph.addEdge(0, 1, 1);
graph.addEdge(0, 2, 2);
graph.addEdge(0, 3, 3);
graph.addEdge(1, 2, 4);
graph.addEdge(1, 3, 5);
graph.addEdge(2, 3, 6);

const colony = new Colony(graph, 10);
colony.run();
