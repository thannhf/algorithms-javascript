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
