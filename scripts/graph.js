"use strict";
class Graph {
    constructor() {
        this.numberOfNodes = 0;
        this.adjacentList = new Map();
        this.nodes = new Map();
    }
    addVertex(node) {
        this.nodes.set(node.id, node);
        this.adjacentList.set(node.id, []);
    }
    addEdge(node1, node2) {
        const edges = this.adjacentList.get(node1.id);
        if (edges) {
            const newEdge = new Arrow(node1, node2);
            if (!this.isEdgeNode(node1.id, newEdge)) {
                edges.push(newEdge);
            }
        }
    }
    deleteNode(nodeId) {
        this.nodes.delete(nodeId);
        this.adjacentList.delete(nodeId);
        for (let edgesInfo of this.adjacentList) {
            const edgesFromNodeId = edgesInfo[0];
            const newEdges = edgesInfo[1].filter((edge) => edge.toNode.id !== nodeId);
            this.adjacentList.set(edgesFromNodeId, newEdges);
        }
    }
    showConnections() {
        const allNodes = this.adjacentList.keys();
        for (let node of allNodes) {
            let nodeConnections = this.adjacentList.get(node);
            let connections = "";
            if (nodeConnections.length > 0) {
                for (let vertex of nodeConnections) {
                    connections += vertex.toNode.id + " ";
                }
            }
            console.log(node + "--> [ " + connections + " ]");
        }
    }
    getArrows() {
        return this.adjacentList.values();
    }
    getNodes() {
        return this.nodes.values();
    }
    isEdgeNode(nodeId, edge) {
        const edges = this.adjacentList.get(nodeId);
        if (edges) {
            return !!edges.find((nodeEdge) => nodeEdge.fromNode === edge.fromNode && nodeEdge.toNode === edge.toNode);
        }
        return false;
    }
}
