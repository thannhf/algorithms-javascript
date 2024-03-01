// Thuật toán Kosaraju là một thuật toán hiệu quả để tìm tất cả các thành phần mạnh trong một đồ thị hướng. Thuật toán hoạt động dựa trên hai bước:
//Bước 1: Chạy thuật toán DFS ngược (reverse DFS) trên đồ thị ban đầu để tạo ra một danh sách các đỉnh theo thứ tự hậu duỗi (postorder).
//Bước 2: Chạy thuật toán DFS trên đồ thị chuyển vị (transpose graph) của đồ thị ban đầu, bắt đầu từ mỗi đỉnh trong danh sách hậu duỗi. Các đỉnh được truy cập trong cùng một lần DFS thuộc về cùng một thành phần mạnh.

// lớp mô tả một đỉnh trong đồ thị
class Vertex{
  constructor(id) {
    this.id = id;
    this.visited = false;
    this.neighbors = [];
  }
  addEdge(vertex){
    this.neighbors.push(vertex);
  }
}
// lớp mô tả một đồ thị hướng
class DirectedGraph{
  constructor(){
    this.vertices = new Map();
  }
  addVertex(id){
    if(!this.vertices.has(id)){
      this.vertices.set(id, new Vertex(id));
    }
  }
  addEdge(sourceId, destId){
    const sourceVertex = this.vertices.get(sourceId);
    const destVertex = this.vertices.get(destId);
    sourceVertex.addEdge(destVertex);
  }
  // hàm thực hiện thuật toán DFS ngược
  reverseDFS(vertex, stack){
    vertex.visited = true;
    for(const neighbor of vertex.neighbors){
      if(!neighbor.visited){
        this.reverseDFS(neighbor, stack);
      }
    }
    stack.push(vertex);
  }
  // hàm thực hiện thuật toán DFS trên đồ thị chuyển vị
  findStronglyConnectedComponents(startVertex){
    const stack = [];
    this.reverseDFS(startVertex, stack);
    // tạo đồ thị chuyển vị
    const transposedGraph = new DirectedGraph();
    for(const vertex of this.vertices.values()){
      transposedGraph.addVertex(vertex.id);
    }
    for(const vertex of this.vertices.values()){
      for(const neighbor of vertex.neighbors){
        transposedGraph.addEdge(neighbor.id, vertex.id);
      }
    }
    // duyệt qua danh sách hậu chuỗi và thực hiện DFS trên đồ thị chuyển vị
    const visited = new Map();
    const components = [];
    while(stack.length > 0) {
      const vertex = stack.pop();
      if(!visited.has(vertex.id)) {
        visited.set(vertex.id, true);
        const component = [];
        this.dfs(vertex, transposedGraph, component);
        components.push(component);
      }
    }
    return components;
  }
  // hàm thực hiện thuật toán DFS
  dfs(vertex, graph, component){
    component.push(vertex.id);
    vertex.visited = true;
    for(const neighbor of graph.vertices.get(vertex.id).neighbors) {
      if(!neighbor.visited){
        this.dfs(neighbor, graph, component);
      }
    }
  }
}
// Ví dụ sử dụng
const graph = new DirectedGraph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addEdge(1, 2);
graph.addEdge(2, 3);
graph.addEdge(3, 1);
graph.addEdge(4, 2);
const components = graph.findStronglyConnectedComponents(graph.vertices.get(1));
console.log("Thành phần mạnh:", components);
