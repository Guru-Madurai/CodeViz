import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrayElement, NodeState, StackItem, QueueItem, NavigationTab } from '../types';
import {
  Database,
  Plus,
  Trash2,
  Search,
  Shuffle,
  RotateCcw,
  Layers,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Workflow,
  Sparkles,
  Play
} from 'lucide-react';

interface BSTNode {
  value: number;
  left?: BSTNode;
  right?: BSTNode;
}

function insertBST(root: BSTNode | undefined, value: number): BSTNode {
  if (!root) return { value };
  if (value < root.value) {
    return { ...root, left: insertBST(root.left, value) };
  } else if (value > root.value) {
    return { ...root, right: insertBST(root.right, value) };
  }
  return root;
}

function inOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  inOrderBST(root.left, res);
  res.push(root.value);
  inOrderBST(root.right, res);
  return res;
}

function preOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  res.push(root.value);
  preOrderBST(root.left, res);
  preOrderBST(root.right, res);
  return res;
}

function postOrderBST(root: BSTNode | undefined, res: number[] = []): number[] {
  if (!root) return res;
  postOrderBST(root.left, res);
  postOrderBST(root.right, res);
  res.push(root.value);
  return res;
}

function searchBSTPath(root: BSTNode | undefined, target: number, path: number[] = []): { found: boolean; path: number[] } {
  if (!root) return { found: false, path };
  path.push(root.value);
  if (root.value === target) return { found: true, path };
  if (target < root.value) return searchBSTPath(root.left, target, path);
  return searchBSTPath(root.right, target, path);
}

interface FlatBSTNode {
  id: string;
  value: number;
  x: number;
  y: number;
  px?: number;
  py?: number;
}

function computeBSTFlatNodes(
  node: BSTNode | undefined,
  x: number,
  y: number,
  gap: number,
  px?: number,
  py?: number,
  acc: FlatBSTNode[] = []
): FlatBSTNode[] {
  if (!node) return acc;
  acc.push({ id: `bst-${node.value}`, value: node.value, x, y, px, py });
  if (node.left) {
    computeBSTFlatNodes(node.left, x - gap, y + 55, Math.max(22, gap / 1.8), x, y, acc);
  }
  if (node.right) {
    computeBSTFlatNodes(node.right, x + gap, y + 55, Math.max(22, gap / 1.8), x, y, acc);
  }
  return acc;
}

const defaultBSTRoot: BSTNode = {
  value: 50,
  left: {
    value: 30,
    left: { value: 20 },
    right: { value: 40 }
  },
  right: {
    value: 70,
    left: { value: 60 },
    right: { value: 80 }
  }
};

interface DataStructuresViewProps {
  setCurrentTab: (tab: NavigationTab) => void;
}

export const DataStructuresView: React.FC<DataStructuresViewProps> = ({ setCurrentTab }) => {
  const [activeDs, setActiveDs] = useState<
    'array' | 'linked-list' | 'stack-queue' | 'bst' | 'graph' | 'hash-map' | 'heap'
  >('array');

  // ARRAY STATE
  const [array, setArray] = useState<ArrayElement[]>([
    { id: '1', value: 10, index: 0, state: 'default' },
    { id: '2', value: 25, index: 1, state: 'default' },
    { id: '3', value: 7, index: 2, state: 'default' },
    { id: '4', value: 42, index: 3, state: 'default' },
    { id: '5', value: 18, index: 4, state: 'default' },
    { id: '6', value: 33, index: 5, state: 'default' },
    { id: '7', value: 5, index: 6, state: 'default' },
    { id: '8', value: 29, index: 7, state: 'default' }
  ]);
  const [inputValue, setInputValue] = useState<string>('15');
  const [inputIndex, setInputIndex] = useState<string>('2');
  const [statusMessage, setStatusMessage] = useState<string>('Array initialized with 8 elements.');

  // STACK & QUEUE STATE
  const [stack, setStack] = useState<StackItem[]>([
    { id: 's1', value: 10 },
    { id: 's2', value: 25 },
    { id: 's3', value: 7 }
  ]);
  const [queue, setQueue] = useState<QueueItem[]>([
    { id: 'q1', value: 15 },
    { id: 'q2', value: 30 },
    { id: 'q3', value: 8 }
  ]);
  const [stackValInput, setStackValInput] = useState<string>('99');
  const [queueValInput, setQueueValInput] = useState<string>('45');
  const [stackHighlightIdx, setStackHighlightIdx] = useState<number | null>(null);
  const [stackPushFlashId, setStackPushFlashId] = useState<string | null>(null);
  const [stackPopFlashId, setStackPopFlashId] = useState<string | null>(null);
  const [stackStatusMsg, setStackStatusMsg] = useState<string>('Stack initialized.');
  const [queueHighlightIdx, setQueueHighlightIdx] = useState<number | null>(null);
  const [queueEnqueueFlashId, setQueueEnqueueFlashId] = useState<string | null>(null);
  const [queueDequeueFlashId, setQueueDequeueFlashId] = useState<string | null>(null);
  const [queueStatusMsg, setQueueStatusMsg] = useState<string>('Queue initialized.');

  // LINKED LIST STATE & TYPES
  const [llType, setLlType] = useState<'singly' | 'doubly' | 'circular'>('singly');
  const [linkedList, setLinkedList] = useState<number[]>([12, 45, 78, 34]);
  const [llInputVal, setLlInputVal] = useState<string>('99');
  const [llInputIndex, setLlInputIndex] = useState<string>('1');
  const [llHighlightIdx, setLlHighlightIdx] = useState<number | null>(null);
  const [llStatusMsg, setLlStatusMsg] = useState<string>('Singly Linked List initialized.');
  const [llTraversalResult, setLlTraversalResult] = useState<string | null>(null);

  // LINKED LIST HANDLERS
  const handleLLInsertHead = () => {
    const val = parseInt(llInputVal) || Math.floor(Math.random() * 90) + 10;
    setLinkedList([val, ...linkedList]);
    setLlHighlightIdx(0);
    setLlStatusMsg(`Inserted ${val} at Head of ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLInsertTail = () => {
    const val = parseInt(llInputVal) || Math.floor(Math.random() * 90) + 10;
    setLinkedList([...linkedList, val]);
    setLlHighlightIdx(linkedList.length);
    setLlStatusMsg(`Inserted ${val} at Tail of ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLInsertAt = () => {
    const val = parseInt(llInputVal) || 50;
    const idx = Math.max(0, Math.min(linkedList.length, parseInt(llInputIndex) || 0));
    const newLL = [...linkedList];
    newLL.splice(idx, 0, val);
    setLinkedList(newLL);
    setLlHighlightIdx(idx);
    setLlStatusMsg(`Inserted ${val} at Index ${idx} of ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLDeleteHead = () => {
    if (linkedList.length === 0) return;
    const removed = linkedList[0];
    setLinkedList(linkedList.slice(1));
    setLlHighlightIdx(null);
    setLlStatusMsg(`Deleted Head node (${removed}) from ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLDeleteTail = () => {
    if (linkedList.length === 0) return;
    const removed = linkedList[linkedList.length - 1];
    setLinkedList(linkedList.slice(0, -1));
    setLlHighlightIdx(null);
    setLlStatusMsg(`Deleted Tail node (${removed}) from ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLDeleteAt = () => {
    if (linkedList.length === 0) return;
    const idx = Math.max(0, Math.min(linkedList.length - 1, parseInt(llInputIndex) || 0));
    const removed = linkedList[idx];
    const newLL = linkedList.filter((_, i) => i !== idx);
    setLinkedList(newLL);
    setLlHighlightIdx(null);
    setLlStatusMsg(`Deleted node at Index ${idx} (${removed}) from ${llType.toUpperCase()} Linked List.`);
    setLlTraversalResult(null);
  };

  const handleLLDeleteValue = () => {
    const target = parseInt(llInputVal);
    if (isNaN(target)) return;
    const idx = linkedList.indexOf(target);
    if (idx === -1) {
      setLlStatusMsg(`Value ${target} not found in ${llType.toUpperCase()} Linked List.`);
      return;
    }
    const newLL = linkedList.filter((v) => v !== target);
    setLinkedList(newLL);
    setLlHighlightIdx(null);
    setLlStatusMsg(`Deleted value ${target} at position ${idx}.`);
    setLlTraversalResult(null);
  };

  const handleLLSearch = async () => {
    const target = parseInt(llInputVal);
    if (isNaN(target)) return;
    setLlStatusMsg(`Searching for ${target} in ${llType.toUpperCase()} Linked List...`);
    for (let i = 0; i < linkedList.length; i++) {
      setLlHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 450));
      if (linkedList[i] === target) {
        setLlStatusMsg(`Found value ${target} at Node Index ${i}!`);
        return;
      }
    }
    setLlHighlightIdx(null);
    setLlStatusMsg(`Value ${target} not found in Linked List.`);
  };

  const handleLLTraverse = async () => {
    if (linkedList.length === 0) {
      setLlStatusMsg('Linked list is empty.');
      setLlTraversalResult('Empty');
      return;
    }
    setLlStatusMsg(`Traversing ${llType.toUpperCase()} Linked List step-by-step...`);
    setLlTraversalResult('');
    const accumulated: number[] = [];
    for (let i = 0; i < linkedList.length; i++) {
      setLlHighlightIdx(i);
      accumulated.push(linkedList[i]);
      setLlTraversalResult(accumulated.join('->'));
      await new Promise((r) => setTimeout(r, 500));
    }
    setLlHighlightIdx(null);
    const finalSeq = linkedList.join('->');
    setLlTraversalResult(finalSeq);
    setLlStatusMsg(`Completed traversal: ${finalSeq}`);
  };

  // HASH MAP STATE (Chaining Visualizer)
  const [mapBuckets, setMapBuckets] = useState<Array<Array<{ key: string; value: string }>>>([
    [{ key: 'name', value: 'Alice' }, { key: 'city', value: 'Tokyo' }],
    [{ key: 'age', value: '25' }],
    [],
    [{ key: 'role', value: 'Engineer' }],
    [],
    [{ key: 'language', value: 'TypeScript' }],
    [],
    [{ key: 'active', value: 'true' }]
  ]);
  const [mapKeyInput, setMapKeyInput] = useState<string>('score');
  const [mapValInput, setMapValInput] = useState<string>('100');
  const [mapStatusMsg, setMapStatusMsg] = useState<string>('Hash Table with 8 buckets & collision chaining.');
  const [mapActiveBucket, setMapActiveBucket] = useState<number | null>(null);

  const hashKey = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 8;
  };

  const handleMapPut = () => {
    if (!mapKeyInput.trim()) return;
    const bIdx = hashKey(mapKeyInput.trim());
    setMapActiveBucket(bIdx);
    setMapBuckets((prev) => {
      const copy = prev.map((b) => [...b]);
      const existing = copy[bIdx].findIndex((pair) => pair.key === mapKeyInput.trim());
      if (existing !== -1) {
        copy[bIdx][existing] = { key: mapKeyInput.trim(), value: mapValInput };
      } else {
        copy[bIdx].push({ key: mapKeyInput.trim(), value: mapValInput });
      }
      return copy;
    });
    setMapStatusMsg(`Inserted key "${mapKeyInput}" at Bucket #${bIdx} via hash(${mapKeyInput}) % 8.`);
  };

  const handleMapSearch = () => {
    if (!mapKeyInput.trim()) return;
    const bIdx = hashKey(mapKeyInput.trim());
    setMapActiveBucket(bIdx);
    const bucket = mapBuckets[bIdx];
    const found = bucket.find((p) => p.key === mapKeyInput.trim());
    if (found) {
      setMapStatusMsg(`Found key "${found.key}" = "${found.value}" in Bucket #${bIdx}!`);
    } else {
      setMapStatusMsg(`Key "${mapKeyInput}" not found in Bucket #${bIdx}.`);
    }
  };

  const handleMapDelete = () => {
    if (!mapKeyInput.trim()) return;
    const bIdx = hashKey(mapKeyInput.trim());
    setMapActiveBucket(bIdx);
    setMapBuckets((prev) => {
      const copy = prev.map((b) => [...b]);
      copy[bIdx] = copy[bIdx].filter((p) => p.key !== mapKeyInput.trim());
      return copy;
    });
    setMapStatusMsg(`Deleted key "${mapKeyInput}" from Bucket #${bIdx}.`);
  };

  // GRAPH STATE & HANDLERS
  const [graphNodes, setGraphNodes] = useState<{ id: string; x: number; y: number }[]>([
    { id: 'A', x: 80, y: 50 },
    { id: 'B', x: 200, y: 40 },
    { id: 'C', x: 100, y: 150 },
    { id: 'D', x: 280, y: 140 },
    { id: 'E', x: 180, y: 220 },
    { id: 'F', x: 340, y: 230 }
  ]);
  const [graphEdges, setGraphEdges] = useState<[string, string][]>([
    ['A', 'B'], ['A', 'C'], ['B', 'D'], ['C', 'E'], ['D', 'F'], ['E', 'F']
  ]);
  const [graphActiveNode, setGraphActiveNode] = useState<string | null>(null);
  const [graphVisitedNodes, setGraphVisitedNodes] = useState<string[]>([]);
  const [graphStatusMsg, setGraphStatusMsg] = useState<string>('Graph initialized with 6 vertices & 6 edges.');
  const [graphNewNodeId, setGraphNewNodeId] = useState<string>('G');

  const handleGraphBFS = async () => {
    setGraphVisitedNodes([]);
    setGraphStatusMsg('Running Breadth-First Search (BFS)...');
    const visited: string[] = [];
    const queue: string[] = ['A'];

    while (queue.length > 0) {
      const curr = queue.shift()!;
      if (!visited.includes(curr)) {
        visited.push(curr);
        setGraphActiveNode(curr);
        setGraphVisitedNodes([...visited]);
        await new Promise((r) => setTimeout(r, 600));

        // Get neighbors
        const neighbors = graphEdges
          .filter(([u, v]) => u === curr || v === curr)
          .map(([u, v]) => (u === curr ? v : u));

        for (const n of neighbors) {
          if (!visited.includes(n) && !queue.includes(n)) {
            queue.push(n);
          }
        }
      }
    }
    setGraphActiveNode(null);
    setGraphStatusMsg(`BFS Traversal Complete! Visited order: ${visited.join(' → ')}`);
  };

  const handleGraphDFS = async () => {
    setGraphVisitedNodes([]);
    setGraphStatusMsg('Running Depth-First Search (DFS)...');
    const visited: string[] = [];
    const stack: string[] = ['A'];

    while (stack.length > 0) {
      const curr = stack.pop()!;
      if (!visited.includes(curr)) {
        visited.push(curr);
        setGraphActiveNode(curr);
        setGraphVisitedNodes([...visited]);
        await new Promise((r) => setTimeout(r, 600));

        // Get neighbors
        const neighbors = graphEdges
          .filter(([u, v]) => u === curr || v === curr)
          .map(([u, v]) => (u === curr ? v : u));

        for (const n of neighbors.reverse()) {
          if (!visited.includes(n)) {
            stack.push(n);
          }
        }
      }
    }
    setGraphActiveNode(null);
    setGraphStatusMsg(`DFS Traversal Complete! Visited order: ${visited.join(' → ')}`);
  };

  const handleGraphAddNode = () => {
    if (!graphNewNodeId || graphNodes.some((n) => n.id === graphNewNodeId)) return;
    const newN = { id: graphNewNodeId.toUpperCase(), x: Math.floor(Math.random() * 300) + 50, y: Math.floor(Math.random() * 180) + 40 };
    setGraphNodes([...graphNodes, newN]);
    // auto-add edge to random existing node
    const randomExisting = graphNodes[Math.floor(Math.random() * graphNodes.length)];
    if (randomExisting) {
      setGraphEdges([...graphEdges, [newN.id, randomExisting.id]]);
    }
    setGraphStatusMsg(`Added vertex ${newN.id} with connected edge.`);
  };

  // HEAP STATE & HANDLERS
  const [heapType, setHeapType] = useState<'min' | 'max'>('min');
  const [heapArray, setHeapArray] = useState<number[]>([10, 15, 30, 40, 50, 100, 40]);
  const [heapInputVal, setHeapInputVal] = useState<string>('5');
  const [heapActiveIdx, setHeapActiveIdx] = useState<number | null>(null);
  const [heapStatusMsg, setHeapStatusMsg] = useState<string>('Min Heap initialized.');

  const handleHeapInsert = () => {
    const val = parseInt(heapInputVal);
    if (isNaN(val)) return;
    const newH = [...heapArray, val];
    // bubble up
    let i = newH.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      const condition = heapType === 'min' ? newH[i] < newH[parent] : newH[i] > newH[parent];
      if (condition) {
        [newH[i], newH[parent]] = [newH[parent], newH[i]];
        i = parent;
      } else {
        break;
      }
    }
    setHeapArray(newH);
    setHeapActiveIdx(i);
    setHeapStatusMsg(`Inserted ${val} into ${heapType.toUpperCase()} Heap.`);
  };

  const handleHeapExtract = () => {
    if (heapArray.length === 0) return;
    const rootVal = heapArray[0];
    if (heapArray.length === 1) {
      setHeapArray([]);
      setHeapStatusMsg(`Extracted root element (${rootVal}). Heap is now empty.`);
      return;
    }
    const last = heapArray.pop()!;
    const newH = [...heapArray];
    newH[0] = last;

    // sink down
    let i = 0;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = i;

      if (left < newH.length) {
        const condL = heapType === 'min' ? newH[left] < newH[target] : newH[left] > newH[target];
        if (condL) target = left;
      }
      if (right < newH.length) {
        const condR = heapType === 'min' ? newH[right] < newH[target] : newH[right] > newH[target];
        if (condR) target = right;
      }

      if (target !== i) {
        [newH[i], newH[target]] = [newH[target], newH[i]];
        i = target;
      } else {
        break;
      }
    }
    setHeapArray(newH);
    setHeapActiveIdx(0);
    setHeapStatusMsg(`Extracted root (${rootVal}) from ${heapType.toUpperCase()} Heap.`);
  };

  // BST ANIMATED TRAVERSAL STEP HANDLER
  const handleBstAnimatedTraversal = async (type: 'In-Order' | 'Pre-Order' | 'Post-Order') => {
    if (!bstRoot) return;
    let seq: number[] = [];
    if (type === 'In-Order') seq = inOrderBST(bstRoot);
    if (type === 'Pre-Order') seq = preOrderBST(bstRoot);
    if (type === 'Post-Order') seq = postOrderBST(bstRoot);

    setBstTraversal({ type, sequence: seq });
    setBstStatusMsg(`Animating ${type} traversal sequence...`);

    for (let i = 0; i < seq.length; i++) {
      setBstActivePath(seq.slice(0, i + 1));
      setBstFoundVal(seq[i]);
      await new Promise((r) => setTimeout(r, 600));
    }
    setBstStatusMsg(`${type} traversal complete! Sequence: ${seq.join(' → ')}`);
  };

  // BST STATE
  const [bstRoot, setBstRoot] = useState<BSTNode | undefined>(defaultBSTRoot);
  const [bstInputVal, setBstInputVal] = useState<string>('25');
  const [bstSearchVal, setBstSearchVal] = useState<string>('40');
  const [bstActivePath, setBstActivePath] = useState<number[]>([]);
  const [bstFoundVal, setBstFoundVal] = useState<number | null>(null);
  const [bstStatusMsg, setBstStatusMsg] = useState<string>('BST initialized with 7 nodes.');
  const [bstTraversal, setBstTraversal] = useState<{ type: string; sequence: number[] } | null>(null);

  const handleBstInsert = () => {
    const val = parseInt(bstInputVal);
    if (isNaN(val)) return;
    setBstRoot((prev) => insertBST(prev, val));
    setBstActivePath([val]);
    setBstFoundVal(val);
    setBstStatusMsg(`Inserted node ${val} into Binary Search Tree.`);
  };

  const handleBstSearch = () => {
    const val = parseInt(bstSearchVal);
    if (isNaN(val) || !bstRoot) return;
    const { found, path } = searchBSTPath(bstRoot, val);
    setBstActivePath(path);
    if (found) {
      setBstFoundVal(val);
      setBstStatusMsg(`Found node ${val}! Traversal path: ${path.join(' → ')}`);
    } else {
      setBstFoundVal(null);
      setBstStatusMsg(`Node ${val} not found in BST. Traversal path: ${path.join(' → ')}`);
    }
  };

  const handleBstTraversal = (type: 'In-Order' | 'Pre-Order' | 'Post-Order') => {
    if (!bstRoot) return;
    let seq: number[] = [];
    if (type === 'In-Order') seq = inOrderBST(bstRoot);
    if (type === 'Pre-Order') seq = preOrderBST(bstRoot);
    if (type === 'Post-Order') seq = postOrderBST(bstRoot);
    setBstTraversal({ type, sequence: seq });
    setBstActivePath(seq);
    setBstStatusMsg(`${type} traversal sequence: ${seq.join(' → ')}`);
  };

  const handleBstReset = () => {
    setBstRoot(defaultBSTRoot);
    setBstActivePath([]);
    setBstFoundVal(null);
    setBstTraversal(null);
    setBstStatusMsg('BST reset to default 7-node balanced tree.');
  };

  // Array operations
  const handlePush = () => {
    const val = parseInt(inputValue) || Math.floor(Math.random() * 90) + 10;
    const newEl: ArrayElement = {
      id: Date.now().toString(),
      value: val,
      index: array.length,
      state: 'inserting'
    };
    setArray([...array, newEl]);
    setStatusMessage(`Pushed element ${val} to end of array.`);

    setTimeout(() => {
      setArray((prev) => prev.map((el) => ({ ...el, state: 'default' })));
    }, 800);
  };

  const handlePop = () => {
    if (array.length === 0) return;
    const last = array[array.length - 1];
    setArray((prev) =>
      prev.map((el, i) => (i === prev.length - 1 ? { ...el, state: 'removing' } : el))
    );
    setStatusMessage(`Popping last element (${last.value})...`);

    setTimeout(() => {
      setArray((prev) => prev.slice(0, prev.length - 1));
      setStatusMessage('Element popped from array.');
    }, 600);
  };

  const handleInsertAt = () => {
    const idx = Math.max(0, Math.min(array.length, parseInt(inputIndex) || 0));
    const val = parseInt(inputValue) || 50;
    const newEl: ArrayElement = { id: Date.now().toString(), value: val, index: idx, state: 'inserting' };
    const newArr = [...array];
    newArr.splice(idx, 0, newEl);
    const reindexed = newArr.map((el, i) => ({ ...el, index: i }));
    setArray(reindexed);
    setStatusMessage(`Inserted ${val} at index ${idx}.`);

    setTimeout(() => {
      setArray((prev) => prev.map((el) => ({ ...el, state: 'default' })));
    }, 800);
  };

  const handleDeleteAt = () => {
    if (array.length === 0) return;
    const idx = Math.max(0, Math.min(array.length - 1, parseInt(inputIndex) || 0));
    const targetVal = array[idx]?.value;

    setArray((prev) =>
      prev.map((el, i) => (i === idx ? { ...el, state: 'removing' } : el))
    );
    setStatusMessage(`Deleting element at index ${idx} (${targetVal})...`);

    setTimeout(() => {
      setArray((prev) => {
        const filtered = prev.filter((_, i) => i !== idx);
        return filtered.map((el, i) => ({ ...el, index: i, state: 'default' }));
      });
      setStatusMessage(`Deleted element at index ${idx}.`);
    }, 600);
  };

  const handleSearch = async () => {
    const target = parseInt(inputValue) || 42;
    setStatusMessage(`Searching for target ${target}...`);

    for (let i = 0; i < array.length; i++) {
      setArray((prev) =>
        prev.map((el, idx) => ({
          ...el,
          state: idx === i ? 'comparing' : idx < i ? 'default' : 'default'
        }))
      );
      await new Promise((r) => setTimeout(r, 400));

      if (array[i].value === target) {
        setArray((prev) =>
          prev.map((el, idx) => ({ ...el, state: idx === i ? 'found' : 'default' }))
        );
        setStatusMessage(`Target ${target} found at index ${i}!`);
        return;
      }
    }
    setStatusMessage(`Target ${target} not found in array.`);
  };

  const handleShuffle = () => {
    const shuffled = [...array].sort(() => Math.random() - 0.5).map((el, i) => ({
      ...el,
      index: i,
      state: 'default' as NodeState
    }));
    setArray(shuffled);
    setStatusMessage('Shuffled array elements.');
  };

  const handleResetArray = () => {
    setArray([
      { id: '1', value: 10, index: 0, state: 'default' },
      { id: '2', value: 25, index: 1, state: 'default' },
      { id: '3', value: 7, index: 2, state: 'default' },
      { id: '4', value: 42, index: 3, state: 'default' },
      { id: '5', value: 18, index: 4, state: 'default' },
      { id: '6', value: 33, index: 5, state: 'default' },
      { id: '7', value: 5, index: 6, state: 'default' },
      { id: '8', value: 29, index: 7, state: 'default' }
    ]);
    setStatusMessage('Reset array to default state.');
  };

  // Stack & Queue Push/Pop
  const handleStackPush = () => {
    const val = parseInt(stackValInput) || Math.floor(Math.random() * 80) + 10;
    const newId = `${Date.now()}-stack`;
    setStack((prev) => [{ id: newId, value: val }, ...prev]);
    setStackPushFlashId(newId);
    setTimeout(() => setStackPushFlashId(null), 1000);
    setStackStatusMsg(`Pushed ${val} onto Stack (new TOP).`);
  };

  const handleStackPop = async () => {
    if (stackPopFlashId) return;
    if (stack.length > 0) {
      const topItem = stack[0];
      setStackPopFlashId(topItem.id);
      setStackStatusMsg(`Popping ${topItem.value} from Stack...`);
      await new Promise((r) => setTimeout(r, 1000));
      setStack((prev) => prev.filter((item) => item.id !== topItem.id));
      setStackPopFlashId(null);
      setStackStatusMsg(`Popped ${topItem.value} from Stack.`);
    } else {
      setStackStatusMsg('Stack is empty. Cannot pop.');
    }
  };

  const handleStackPeek = () => {
    if (stack.length === 0) {
      setStackStatusMsg('Stack is empty.');
      return;
    }
    setStackHighlightIdx(0);
    setStackStatusMsg(`Peek: TOP element is ${stack[0].value}`);
    setTimeout(() => setStackHighlightIdx(null), 1500);
  };

  const handleStackSearch = async () => {
    const target = parseInt(stackValInput);
    if (isNaN(target)) {
      setStackStatusMsg('Please enter a valid number in input to search.');
      return;
    }
    setStackStatusMsg(`Searching for ${target} in Stack...`);
    for (let i = 0; i < stack.length; i++) {
      setStackHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 450));
      if (stack[i].value === target) {
        setStackStatusMsg(`Found value ${target} at Stack position ${i} (${i === 0 ? 'TOP' : `Depth ${i}`})!`);
        return;
      }
    }
    setStackHighlightIdx(null);
    setStackStatusMsg(`Value ${target} not found in Stack.`);
  };

  const handleStackTraverse = async () => {
    if (stack.length === 0) {
      setStackStatusMsg('Stack is empty.');
      return;
    }
    setStackStatusMsg('Traversing Stack from TOP to BOTTOM...');
    for (let i = 0; i < stack.length; i++) {
      setStackHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 500));
    }
    setStackHighlightIdx(null);
    setStackStatusMsg(`Traversed all ${stack.length} Stack elements.`);
  };

  const handleQueueEnqueue = () => {
    const val = parseInt(queueValInput) || Math.floor(Math.random() * 80) + 10;
    const newId = `${Date.now()}-queue`;
    setQueue((prev) => [...prev, { id: newId, value: val }]);
    setQueueEnqueueFlashId(newId);
    setTimeout(() => setQueueEnqueueFlashId(null), 1000);
    setQueueStatusMsg(`Enqueued ${val} at REAR of Queue.`);
  };

  const handleQueueDequeue = async () => {
    if (queueDequeueFlashId) return;
    if (queue.length > 0) {
      const frontItem = queue[0];
      setQueueDequeueFlashId(frontItem.id);
      setQueueStatusMsg(`Dequeuing ${frontItem.value} from FRONT...`);
      await new Promise((r) => setTimeout(r, 1000));
      setQueue((prev) => prev.filter((item) => item.id !== frontItem.id));
      setQueueDequeueFlashId(null);
      setQueueStatusMsg(`Dequeued ${frontItem.value} from FRONT of Queue.`);
    } else {
      setQueueStatusMsg('Queue is empty. Cannot dequeue.');
    }
  };

  const handleQueuePeek = () => {
    if (queue.length === 0) {
      setQueueStatusMsg('Queue is empty.');
      return;
    }
    setQueueHighlightIdx(0);
    setQueueStatusMsg(`Peek: FRONT element is ${queue[0].value}`);
    setTimeout(() => setQueueHighlightIdx(null), 1500);
  };

  const handleQueueSearch = async () => {
    const target = parseInt(queueValInput);
    if (isNaN(target)) {
      setQueueStatusMsg('Please enter a valid number in input to search.');
      return;
    }
    setQueueStatusMsg(`Searching for ${target} in Queue...`);
    for (let i = 0; i < queue.length; i++) {
      setQueueHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 450));
      if (queue[i].value === target) {
        setQueueStatusMsg(`Found value ${target} at Queue position ${i} (${i === 0 ? 'FRONT' : i === queue.length - 1 ? 'REAR' : `Position ${i}`})!`);
        return;
      }
    }
    setQueueHighlightIdx(null);
    setQueueStatusMsg(`Value ${target} not found in Queue.`);
  };

  const handleQueueTraverse = async () => {
    if (queue.length === 0) {
      setQueueStatusMsg('Queue is empty.');
      return;
    }
    setQueueStatusMsg('Traversing Queue from FRONT to REAR...');
    for (let i = 0; i < queue.length; i++) {
      setQueueHighlightIdx(i);
      await new Promise((r) => setTimeout(r, 500));
    }
    setQueueHighlightIdx(null);
    setQueueStatusMsg(`Traversed all ${queue.length} Queue elements.`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Database className="w-6 h-6 text-indigo-400" />
              <h1 className="text-2xl font-extrabold text-slate-100">Master Data Structures Visually</h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Interactive visualizations of fundamental data structures. Observe operations in real-time with step-by-step animations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCurrentTab('playground')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run in Playground</span>
            </button>
          </div>
        </div>

        {/* Data Structure Selection Pill Bar */}
        <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
          {[
            { id: 'array', label: 'Array', icon: Database },
            { id: 'linked-list', label: 'Linked List', icon: Workflow },
            { id: 'stack-queue', label: 'Stack & Queue', icon: Layers },
            { id: 'bst', label: 'Binary Search Tree', icon: Workflow },
            { id: 'graph', label: 'Graph', icon: Workflow },
            { id: 'hash-map', label: 'Hash Map', icon: Database },
            { id: 'heap', label: 'Heap', icon: Layers }
          ].map((ds) => {
            const Icon = ds.icon;
            const isActive = activeDs === ds.id;
            return (
              <button
                key={ds.id}
                onClick={() => setActiveDs(ds.id as any)}
                id={`ds-select-${ds.id}`}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-950/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{ds.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeDs}
            initial={{ opacity: 0, y: 10, scale: 0.998, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.996, filter: 'blur(2px)' }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-6"
          >
        {/* VIEW 1: ARRAY VISUALIZER */}
        {activeDs === 'array' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Array</h2>
                  <p className="text-xs text-slate-400">Dynamic array with push, pop, insert, search operations</p>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl">
                  Access: O(1) | Search: O(n)
                </div>
              </div>

              {/* Controls Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Value"
                  id="array-value-input"
                  className="w-24 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="number"
                  value={inputIndex}
                  onChange={(e) => setInputIndex(e.target.value)}
                  placeholder="Index"
                  id="array-index-input"
                  className="w-20 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                <button
                  onClick={handlePush}
                  id="array-push-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Push</span>
                </button>

                <button
                  onClick={handlePop}
                  id="array-pop-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Pop</span>
                </button>

                <button
                  onClick={handleInsertAt}
                  id="array-insert-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-colors"
                >
                  <span>Insert At</span>
                </button>

                <button
                  onClick={handleDeleteAt}
                  id="array-delete-at-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete At</span>
                </button>

                <button
                  onClick={handleSearch}
                  id="array-search-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search</span>
                </button>

                <button
                  onClick={handleShuffle}
                  id="array-shuffle-btn"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors ml-auto"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={handleResetArray}
                  id="array-reset-btn"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Status Message */}
              <div className="text-xs font-mono text-indigo-300 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/20">
                {statusMessage}
              </div>

              {/* Visual Canvas Display */}
              <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 min-h-[180px] flex items-center justify-start gap-3 overflow-x-auto">
                {array.map((el) => {
                  let bgClass = 'bg-slate-900 border-indigo-500/40 text-slate-100';
                  if (el.state === 'comparing') bgClass = 'bg-amber-500/20 border-amber-500 text-amber-200 scale-105';
                  if (el.state === 'found') bgClass = 'bg-emerald-500/30 border-emerald-400 text-emerald-200 scale-110 shadow-lg shadow-emerald-500/20';
                  if (el.state === 'inserting') bgClass = 'bg-purple-500/30 border-purple-400 text-purple-200 scale-105';
                  if (el.state === 'removing') bgClass = 'bg-red-500/30 border-red-400 text-red-200 opacity-50';

                  return (
                    <div key={el.id} className="flex flex-col items-center gap-2 group shrink-0">
                      <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center font-mono font-bold text-lg shadow-md transition-all duration-300 ${bgClass}`}>
                        {el.value}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">[{el.index}]</span>
                    </div>
                  );
                })}
              </div>

              {/* Color Legend */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 border-t border-slate-800/80 pt-4">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-900 border border-indigo-500/40" /> Default</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500" /> Comparing</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400" /> Found</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-purple-500/30 border border-purple-400" /> Inserting</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-500/30 border border-red-400" /> Removing</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STACK & QUEUE VISUALIZER (Matching Screenshot 4) */}
        {activeDs === 'stack-queue' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-100">Stack & Queue</h2>
                  <p className="text-xs text-slate-400">LIFO Stack and FIFO Queue side by side</p>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl">
                  All operations: O(1)
                </div>
              </div>

              {/* Split Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* STACK (LIFO) */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ArrowUp className="w-4 h-4 text-amber-400" />
                      <h3 className="font-bold text-slate-100 text-sm">Stack <span className="text-xs text-slate-400 font-mono">(LIFO)</span></h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400">size: {stack.length}</span>
                  </div>

                  {/* Stack Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      value={stackValInput}
                      onChange={(e) => setStackValInput(e.target.value)}
                      id="stack-val-input"
                      placeholder="Value"
                      className="w-16 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={handleStackPush}
                      id="stack-push-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      + Push
                    </button>
                    <button
                      onClick={handleStackPop}
                      id="stack-pop-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                    >
                      Pop
                    </button>
                    <button
                      onClick={handleStackPeek}
                      id="stack-peek-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-semibold"
                    >
                      Peek
                    </button>
                    <button
                      onClick={handleStackSearch}
                      id="stack-search-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" /> Search
                    </button>
                    <button
                      onClick={handleStackTraverse}
                      id="stack-traverse-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-white" /> Traverse
                    </button>
                  </div>

                  {/* Stack Status Message */}
                  <div className="bg-amber-950/30 p-2 rounded-xl border border-amber-500/30 text-[11px] font-mono text-amber-200">
                    {stackStatusMsg}
                  </div>

                  {/* Stack Container View */}
                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 flex flex-col items-center gap-2 min-h-[220px] justify-end">
                    {stack.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">Stack is empty</span>
                    ) : (
                      stack.map((item, idx) => {
                        const isTop = idx === 0;
                        const isHighlighted = stackHighlightIdx === idx;
                        const isPushFlashing = stackPushFlashId === item.id;
                        const isPopFading = stackPopFlashId === item.id;

                        let styleClasses = 'bg-[#18233c] border border-slate-700/80 text-slate-100 font-bold';
                        if (isPopFading) {
                          styleClasses = 'bg-red-500/25 border-2 border-red-400/70 text-red-100 opacity-35 scale-95 sq-remove-fade';
                        } else if (isPushFlashing) {
                          styleClasses = 'bg-emerald-500/30 border-2 border-emerald-300 text-emerald-100 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50 scale-105 sq-add-flash';
                        } else if (isHighlighted) {
                          styleClasses = 'bg-purple-600 border-2 border-purple-200 text-white shadow-xl ring-4 ring-purple-400 scale-105';
                        }

                        return (
                          <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full max-w-[200px] relative"
                          >
                            <div
                              className={`py-2.5 rounded-xl font-mono text-center text-base transition-all duration-1000 ease-out ${styleClasses}`}
                            >
                              {item.value}
                            </div>
                            {isTop && (
                              <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-[11px] tracking-wide">
                                ← TOP
                              </span>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                    <span className="text-[10px] font-mono text-slate-500 mt-2">— BOTTOM —</span>
                  </div>
                </div>

                {/* QUEUE (FIFO) */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <ArrowDown className="w-4 h-4 text-cyan-400" />
                      <h3 className="font-bold text-slate-100 text-sm">Queue <span className="text-xs text-slate-400 font-mono">(FIFO)</span></h3>
                    </div>
                    <span className="text-xs font-mono text-slate-400">size: {queue.length}</span>
                  </div>

                  {/* Queue Controls */}
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="number"
                      value={queueValInput}
                      onChange={(e) => setQueueValInput(e.target.value)}
                      id="queue-val-input"
                      placeholder="Value"
                      className="w-16 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                    />
                    <button
                      onClick={handleQueueEnqueue}
                      id="queue-enqueue-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                    >
                      + Enqueue
                    </button>
                    <button
                      onClick={handleQueueDequeue}
                      id="queue-dequeue-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                    >
                      Dequeue
                    </button>
                    <button
                      onClick={handleQueuePeek}
                      id="queue-peek-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-amber-600/80 hover:bg-amber-500 text-white text-xs font-semibold"
                    >
                      Peek
                    </button>
                    <button
                      onClick={handleQueueSearch}
                      id="queue-search-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" /> Search
                    </button>
                    <button
                      onClick={handleQueueTraverse}
                      id="queue-traverse-btn"
                      className="px-2.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-white" /> Traverse
                    </button>
                  </div>

                  {/* Queue Status Message */}
                  <div className="bg-cyan-950/30 p-2 rounded-xl border border-cyan-500/30 text-[11px] font-mono text-cyan-200">
                    {queueStatusMsg}
                  </div>

                  {/* Queue Container View */}
                  <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 flex flex-col items-center gap-2 min-h-[220px] justify-center">
                    <span className="text-[10px] font-mono text-slate-500 mb-1">— FRONT (dequeue here) —</span>
                    {queue.length === 0 ? (
                      <span className="text-xs text-slate-500 italic">Queue is empty</span>
                    ) : (
                      queue.map((item, idx) => {
                        const isFront = idx === 0;
                        const isRear = idx === queue.length - 1;
                        const isHighlighted = queueHighlightIdx === idx;
                        const isEnqueueFlashing = queueEnqueueFlashId === item.id;
                        const isDequeueFading = queueDequeueFlashId === item.id;

                        let bgStyle = 'bg-[#18233c] border border-slate-700/80 text-slate-100 font-bold';
                        if (isDequeueFading) {
                          bgStyle = 'bg-red-500/25 border-2 border-red-400/70 text-red-100 opacity-35 scale-95 sq-remove-fade';
                        } else if (isEnqueueFlashing) {
                          bgStyle = 'bg-emerald-500/30 border-2 border-emerald-300 text-emerald-100 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-400/50 scale-105 sq-add-flash';
                        } else if (isHighlighted) {
                          bgStyle = 'bg-purple-600 border-2 border-purple-200 text-white shadow-xl ring-4 ring-purple-400 scale-105';
                        }

                        return (
                          <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, y: 12, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
                            className="w-full max-w-[200px] relative"
                          >
                            <div className={`py-2.5 rounded-xl font-mono text-center text-base transition-all duration-1000 ease-out ${bgStyle}`}>
                              {item.value}
                            </div>
                            {isFront && (
                              <span className="absolute -right-20 top-1/2 -translate-y-1/2 text-cyan-400 font-mono font-bold text-[11px] tracking-wide">
                                ← FRONT
                              </span>
                            )}
                            {isRear && (
                              <span className="absolute -left-20 top-1/2 -translate-y-1/2 text-emerald-400 font-mono font-bold text-[11px] tracking-wide">
                                REAR →
                              </span>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                    <span className="text-[10px] font-mono text-slate-500 mt-1">— REAR (enqueue here) —</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: LINKED LIST VISUALIZER */}
        {activeDs === 'linked-list' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-indigo-400" /> Linked List Visualizer
                </h2>
                <p className="text-xs text-slate-400">Node chain with data pointers, supporting Singly, Doubly & Circular structures</p>
              </div>

              {/* Linked List Type Selection Tabs */}
              <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {(['singly', 'doubly', 'circular'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setLlType(t);
                      setLlStatusMsg(`Switched to ${t.toUpperCase()} Linked List.`);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${llType === t
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Linked List Operations Panel */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={llInputVal}
                  onChange={(e) => setLlInputVal(e.target.value)}
                  placeholder="Val"
                  className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="number"
                  value={llInputIndex}
                  onChange={(e) => setLlInputIndex(e.target.value)}
                  placeholder="Index"
                  className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                {/* Insertion Group */}
                <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
                  <button
                    onClick={handleLLInsertHead}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    + Head
                  </button>
                  <button
                    onClick={handleLLInsertTail}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
                  >
                    + Tail
                  </button>
                  <button
                    onClick={handleLLInsertAt}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    + At Index
                  </button>
                </div>

                {/* Deletion Group */}
                <div className="flex items-center gap-1.5 border-r border-slate-800 pr-3">
                  <button
                    onClick={handleLLDeleteHead}
                    className="px-3 py-1.5 rounded-xl bg-red-600/80 hover:bg-red-500 text-white text-xs font-semibold"
                  >
                    - Head
                  </button>
                  <button
                    onClick={handleLLDeleteTail}
                    className="px-3 py-1.5 rounded-xl bg-red-700/80 hover:bg-red-600 text-white text-xs font-semibold"
                  >
                    - Tail
                  </button>
                  <button
                    onClick={handleLLDeleteAt}
                    className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold"
                  >
                    - At Index
                  </button>
                  <button
                    onClick={handleLLDeleteValue}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                  >
                    - Val
                  </button>
                </div>

                {/* Search & Traversal */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleLLSearch}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Search className="w-3.5 h-3.5" /> Search
                  </button>
                  <button
                    onClick={handleLLTraverse}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Traverse
                  </button>
                </div>
              </div>

              {/* Status Message Banner */}
              <div className="bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-200">
                {llStatusMsg}
              </div>
            </div>

            {/* Linked List Render Canvas */}
            <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex items-center gap-4 overflow-x-auto min-h-[180px] relative">
              {linkedList.length === 0 ? (
                <div className="text-slate-500 italic text-xs mx-auto">Linked List is empty. Use + Head or + Tail to add nodes.</div>
              ) : (
                linkedList.map((val, idx) => {
                  const isHighlighted = llHighlightIdx === idx;
                  const isHead = idx === 0;
                  const isTail = idx === linkedList.length - 1;

                  return (
                    <React.Fragment key={idx}>
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        {/* Node Role Badges */}
                        <div className="flex items-center gap-1 h-5">
                          {isHead && <span className="text-[10px] font-mono font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-md">HEAD</span>}
                          {isTail && <span className="text-[10px] font-mono font-bold bg-purple-600 text-white px-2 py-0.5 rounded-md">TAIL</span>}
                        </div>

                        {/* Node Card */}
                        <div
                          className={`flex items-center border-2 rounded-2xl overflow-hidden font-mono text-sm transition-all duration-300 ${isHighlighted
                              ? 'border-amber-400 bg-amber-950/80 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/50 scale-105'
                              : 'border-indigo-500/50 bg-slate-900'
                            }`}
                        >
                          {/* Prev Pointer (Doubly) */}
                          {llType === 'doubly' && (
                            <div className="px-2.5 py-3 text-[10px] text-slate-400 border-r border-indigo-500/30 bg-slate-950/40">
                              prev
                            </div>
                          )}

                          {/* Data Value */}
                          <div className={`px-4 py-3 font-bold ${isHighlighted ? 'text-amber-200 bg-amber-900/60' : 'text-indigo-200 bg-indigo-950/60'}`}>
                            {val}
                          </div>

                          {/* Next Pointer */}
                          <div className="px-3 py-3 text-[10px] text-slate-400 border-l border-indigo-500/30 bg-slate-950/40">
                            next
                          </div>
                        </div>

                        <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                      </div>

                      {/* Pointer Arrow */}
                      {idx < linkedList.length - 1 && (
                        <div className="flex items-center shrink-0">
                          {llType === 'doubly' ? (
                            <span className="text-indigo-400 font-extrabold text-sm font-mono px-1">⇆</span>
                          ) : (
                            <ArrowRight className="w-5 h-5 text-indigo-400" />
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  );
                })
              )}

              {/* End Pointer representation */}
              {linkedList.length > 0 && (
                <div className="flex items-center gap-2 shrink-0">
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                  {llType === 'circular' ? (
                    <span className="font-mono text-xs text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded-xl bg-emerald-950/60 flex items-center gap-1 shadow-md">
                      ⟲ Head Node ({linkedList[0]})
                    </span>
                  ) : (
                    <span className="font-mono text-xs text-red-400 border border-red-500/30 px-2 py-1 rounded bg-red-950/40">NULL</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 4: BINARY SEARCH TREE (BST) VISUALIZER */}
        {activeDs === 'bst' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-indigo-400" /> Binary Search Tree (BST)
                </h2>
                <p className="text-xs text-slate-400">Hierarchical tree structure with animated In-Order, Pre-Order & Post-Order step visualizers</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleBstReset}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Tree</span>
                </button>
              </div>
            </div>

            {/* BST Operations Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Insert & Search Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Node Operations</div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={bstInputVal}
                      onChange={(e) => setBstInputVal(e.target.value)}
                      className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                      placeholder="Val"
                    />
                    <button
                      onClick={handleBstInsert}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" /> Insert
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      value={bstSearchVal}
                      onChange={(e) => setBstSearchVal(e.target.value)}
                      className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                      placeholder="Val"
                    />
                    <button
                      onClick={handleBstSearch}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <Search className="w-3.5 h-3.5" /> Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Traversals Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Animated Traversals</div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleBstAnimatedTraversal('In-Order')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-indigo-600/20"
                  >
                    <Play className="w-3 h-3 fill-white" /> In-Order
                  </button>
                  <button
                    onClick={() => handleBstAnimatedTraversal('Pre-Order')}
                    className="px-3 py-1.5 rounded-xl bg-purple-600/90 hover:bg-purple-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-purple-600/20"
                  >
                    <Play className="w-3 h-3 fill-white" /> Pre-Order
                  </button>
                  <button
                    onClick={() => handleBstAnimatedTraversal('Post-Order')}
                    className="px-3 py-1.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-md shadow-amber-600/20"
                  >
                    <Play className="w-3 h-3 fill-white" /> Post-Order
                  </button>
                </div>
              </div>
            </div>

            {/* Status & Traversal Sequence Banner */}
            <div className="bg-indigo-950/40 p-3 rounded-xl border border-indigo-500/30 font-mono text-xs text-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>{bstStatusMsg}</span>
              {bstTraversal && (
                <span className="text-[11px] bg-indigo-900/60 text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-500/40">
                  [{bstTraversal.type}]: {bstTraversal.sequence.join(', ')}
                </span>
              )}
            </div>

            {/* SVG BST Graph Canvas */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center overflow-x-auto min-h-[300px]">
              {(() => {
                const flatNodes = computeBSTFlatNodes(bstRoot, 280, 45, 110);
                return (
                  <svg viewBox="0 0 560 260" className="w-full max-w-2xl h-[260px] select-none">
                    {/* Render Lines */}
                    {flatNodes.map((node) => {
                      if (node.px !== undefined && node.py !== undefined) {
                        const isPathEdge = bstActivePath.includes(node.value);
                        return (
                          <line
                            key={`edge-${node.id}`}
                            x1={node.px}
                            y1={node.py}
                            x2={node.x}
                            y2={node.y}
                            stroke={isPathEdge ? '#a855f7' : '#334155'}
                            strokeWidth={isPathEdge ? '3' : '2'}
                          />
                        );
                      }
                      return null;
                    })}

                    {/* Render Circles & Text */}
                    {flatNodes.map((node) => {
                      const isFound = bstFoundVal === node.value;
                      const isInPath = bstActivePath.includes(node.value);

                      let fill = '#1e1b4b';
                      let stroke = '#6366f1';
                      if (isFound) {
                        fill = '#065f46';
                        stroke = '#34d399';
                      } else if (isInPath) {
                        fill = '#581c87';
                        stroke = '#c084fc';
                      }

                      return (
                        <g key={node.id}>
                          <circle
                            cx={node.x}
                            cy={node.y}
                            r="20"
                            fill={fill}
                            stroke={stroke}
                            strokeWidth="3"
                            className="transition-all duration-300 filter drop-shadow-md"
                          />
                          <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="12"
                            fontWeight="bold"
                            fontFamily="monospace"
                          >
                            {node.value}
                          </text>
                          {isFound && (
                            <text
                              x={node.x}
                              y={node.y - 25}
                              textAnchor="middle"
                              fill="#34d399"
                              fontSize="10"
                              fontWeight="extrabold"
                            >
                              ACTIVE
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                );
              })()}
            </div>
          </div>
        )}

        {/* VIEW 5: GRAPH VISUALIZER */}
        {activeDs === 'graph' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-indigo-400" /> Graph Visualizer
                </h2>
                <p className="text-xs text-slate-400">Vertices and Edges with Breadth-First (BFS) & Depth-First (DFS) animated traversals</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleGraphBFS}
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Run BFS
                </button>
                <button
                  onClick={handleGraphDFS}
                  className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5 fill-white" /> Run DFS
                </button>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={graphNewNodeId}
                  onChange={(e) => setGraphNewNodeId(e.target.value.toUpperCase())}
                  maxLength={2}
                  className="w-16 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1 text-xs font-mono text-center text-slate-200 focus:outline-none"
                  placeholder="Node"
                />
                <button
                  onClick={handleGraphAddNode}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Vertex
                </button>
              </div>

              <div className="text-xs font-mono text-indigo-300">
                Visited Order: [{graphVisitedNodes.join(', ')}]
              </div>
            </div>

            <div className="bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-200">
              {graphStatusMsg}
            </div>

            {/* SVG Graph Canvas */}
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center overflow-x-auto min-h-[300px]">
              <svg viewBox="0 0 420 280" className="w-full max-w-xl h-[280px] select-none">
                {/* Edges */}
                {graphEdges.map(([u, v], i) => {
                  const nodeU = graphNodes.find((n) => n.id === u);
                  const nodeV = graphNodes.find((n) => n.id === v);
                  if (!nodeU || !nodeV) return null;

                  const isVisitedEdge = graphVisitedNodes.includes(u) && graphVisitedNodes.includes(v);

                  return (
                    <line
                      key={`edge-${i}`}
                      x1={nodeU.x}
                      y1={nodeU.y}
                      x2={nodeV.x}
                      y2={nodeV.y}
                      stroke={isVisitedEdge ? '#a855f7' : '#334155'}
                      strokeWidth={isVisitedEdge ? '3' : '2'}
                    />
                  );
                })}

                {/* Vertices */}
                {graphNodes.map((node) => {
                  const isActive = graphActiveNode === node.id;
                  const isVisited = graphVisitedNodes.includes(node.id);

                  let fill = '#1e1b4b';
                  let stroke = '#6366f1';
                  if (isActive) {
                    fill = '#065f46';
                    stroke = '#34d399';
                  } else if (isVisited) {
                    fill = '#581c87';
                    stroke = '#c084fc';
                  }

                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill={fill}
                        stroke={stroke}
                        strokeWidth="3"
                        className="transition-all duration-300 filter drop-shadow-md"
                      />
                      <text
                        x={node.x}
                        y={node.y + 4}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        )}

        {/* VIEW 6: HASH MAP VISUALIZER */}
        {activeDs === 'hash-map' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-400" /> Hash Table / Hash Map
                </h2>
                <p className="text-xs text-slate-400">8 Buckets with collision resolution via Chaining linked lists</p>
              </div>
              <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono px-3 py-1.5 rounded-xl">
                Average Lookup: O(1)
              </div>
            </div>

            {/* HashMap Operations Bar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={mapKeyInput}
                  onChange={(e) => setMapKeyInput(e.target.value)}
                  placeholder="Key"
                  className="w-28 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  value={mapValInput}
                  onChange={(e) => setMapValInput(e.target.value)}
                  placeholder="Value"
                  className="w-28 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-indigo-500"
                />

                <button
                  onClick={handleMapPut}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Put (Insert)
                </button>
                <button
                  onClick={handleMapSearch}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" /> Get (Search)
                </button>
                <button
                  onClick={handleMapDelete}
                  className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove
                </button>
              </div>

              <div className="bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-200">
                {mapStatusMsg}
              </div>
            </div>

            {/* Bucket Chaining Grid */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              {mapBuckets.map((bucket, bIdx) => {
                const isActive = mapActiveBucket === bIdx;
                return (
                  <div
                    key={bIdx}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${isActive
                        ? 'bg-indigo-950/60 border-indigo-400 ring-1 ring-indigo-400/40'
                        : 'bg-slate-900 border-slate-800'
                      }`}
                  >
                    <div className="w-20 font-mono text-xs font-bold text-slate-400 bg-slate-950 px-2 py-1.5 rounded-lg border border-slate-800 text-center shrink-0">
                      Bucket #{bIdx}
                    </div>

                    <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                      {bucket.length === 0 ? (
                        <span className="text-slate-600 text-xs font-mono italic">empty</span>
                      ) : (
                        bucket.map((pair, pIdx) => (
                          <React.Fragment key={pIdx}>
                            <div className="bg-indigo-950 border border-indigo-500/50 text-indigo-200 px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm">
                              <span className="text-purple-300">{pair.key}:</span>
                              <span className="text-amber-300">"{pair.value}"</span>
                            </div>
                            {pIdx < bucket.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />}
                          </React.Fragment>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 7: HEAP VISUALIZER */}
        {activeDs === 'heap' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" /> Binary Heap (Min & Max Heap)
                </h2>
                <p className="text-xs text-slate-400">Complete Binary Tree rendered alongside contiguous Array storage</p>
              </div>

              {/* Min/Max Heap Selector */}
              <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => {
                    setHeapType('min');
                    setHeapStatusMsg('Switched to Min Heap mode.');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${heapType === 'min' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Min Heap
                </button>
                <button
                  onClick={() => {
                    setHeapType('max');
                    setHeapStatusMsg('Switched to Max Heap mode.');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${heapType === 'max' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  Max Heap
                </button>
              </div>
            </div>

            {/* Heap Controls */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={heapInputVal}
                  onChange={(e) => setHeapInputVal(e.target.value)}
                  className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-mono text-slate-200 focus:outline-none"
                  placeholder="Val"
                />
                <button
                  onClick={handleHeapInsert}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Insert Value
                </button>
                <button
                  onClick={handleHeapExtract}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1"
                >
                  Extract Root
                </button>
              </div>

              <div className="bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-500/30 text-xs font-mono text-indigo-200 flex-1">
                {heapStatusMsg}
              </div>
            </div>

            {/* Array Storage View */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Underlying Contiguous Array:</div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-2 overflow-x-auto">
                {heapArray.map((val, idx) => {
                  const isActive = heapActiveIdx === idx;
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1 shrink-0">
                      <div
                        className={`w-12 h-12 rounded-xl border-2 font-mono font-bold text-sm flex items-center justify-center transition-all ${isActive
                            ? 'bg-amber-500/30 border-amber-400 text-amber-200 scale-105 ring-2 ring-amber-400/40'
                            : 'bg-slate-900 border-indigo-500/40 text-slate-200'
                          }`}
                      >
                        {val}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
