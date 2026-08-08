import { PresetCode, Challenge } from '../types';

export const PRESET_CODES: PresetCode[] = [
  {
    id: 'py-fibonacci-memo',
    name: 'Recursive Fibonacci with Memoization',
    language: 'python',
    description: 'Calculates Fibonacci numbers efficiently using memoization dictionary in Python.',
    code: `# Python - Recursive Fibonacci with Memoization
def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    
    result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    memo[n] = result
    return result

# Calculate first 10 Fibonacci numbers
for i in range(10):
    result = fibonacci(i)
    print(f"fib({i}) = {result}")

print("Done!")`,
    steps: [
      {
        stepNumber: 1,
        line: 2,
        codeLine: 'def fibonacci(n, memo={}):',
        callStack: [{ id: 'f1', name: '<module>', line: 2 }],
        variables: [{ name: 'fibonacci', value: '<function fibonacci>', type: 'function' }],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{} (memo cache)' }],
        consoleOutput: '',
        explanation: 'Defined function fibonacci with default memoization dictionary at heap 0x00A1.'
      },
      {
        stepNumber: 2,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'fibonacci', value: '<function fibonacci>', type: 'function' },
          { name: 'i', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: '',
        explanation: 'Entering for-loop with index i = 0.'
      },
      {
        stepNumber: 3,
        line: 14,
        codeLine: 'result = fibonacci(i)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 3, params: 'n=0, memo={}' }
        ],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'n', value: '0', type: 'int', scope: 'fibonacci' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=0)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: '',
        explanation: 'Called fibonacci(n=0). Allocated new frame on Call Stack.'
      },
      {
        stepNumber: 4,
        line: 5,
        codeLine: 'if n <= 1:',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 5, params: 'n=0' }
        ],
        variables: [{ name: 'n', value: '0', type: 'int', scope: 'fibonacci' }],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=0)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Base case evaluated: 0 <= 1 is True.'
      },
      {
        stepNumber: 5,
        line: 6,
        codeLine: 'return n',
        callStack: [{ id: 'f1', name: '<module>', line: 14 }],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Returned 0. Popped fibonacci(n=0) frame from Call Stack.'
      },
      {
        stepNumber: 6,
        line: 15,
        codeLine: 'print(f"fib({i}) = {result}")',
        callStack: [{ id: 'f1', name: '<module>', line: 15 }],
        variables: [
          { name: 'i', value: '0', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: 'fib(0) = 0',
        explanation: 'Printed "fib(0) = 0" to standard stdout console.'
      },
      {
        stepNumber: 7,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'result', value: '0', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Loop iteration i = 1.'
      },
      {
        stepNumber: 8,
        line: 14,
        codeLine: 'result = fibonacci(i)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 3, params: 'n=1, memo={}' }
        ],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'n', value: '1', type: 'int', scope: 'fibonacci' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd3c', name: 'fibonacci(n=1)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Called fibonacci(n=1).'
      },
      {
        stepNumber: 9,
        line: 6,
        codeLine: 'return n',
        callStack: [{ id: 'f1', name: '<module>', line: 14 }],
        variables: [
          { name: 'i', value: '1', type: 'int' },
          { name: 'result', value: '1', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        consoleOutput: 'fib(1) = 1',
        explanation: 'Base case n=1 returned 1.'
      },
      {
        stepNumber: 10,
        line: 13,
        codeLine: 'for i in range(10):',
        callStack: [{ id: 'f1', name: '<module>', line: 13 }],
        variables: [
          { name: 'i', value: '2', type: 'int' },
          { name: 'result', value: '1', type: 'int' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{}' }],
        explanation: 'Loop iteration i = 2.'
      },
      {
        stepNumber: 11,
        line: 8,
        codeLine: 'result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)',
        callStack: [
          { id: 'f1', name: '<module>', line: 14 },
          { id: 'f2', name: 'fibonacci', line: 8, params: 'n=2' },
          { id: 'f3', name: 'fibonacci', line: 3, params: 'n=1' }
        ],
        variables: [
          { name: 'n', value: '2', type: 'int' },
          { name: 'memo[n]', value: 'result', type: 'dict' },
          { name: 'result', value: 'fibonacci(n-1) + fibonacci(n-2)', type: 'int' }
        ],
        stackMemory: [
          { address: '0x7ffd10', name: '<module>', value: 'Frame' },
          { address: '0x7ffd28', name: 'fibonacci(n=2)', value: 'Frame' },
          { address: '0x7ffd40', name: 'fibonacci(n=1)', value: 'Frame' }
        ],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '{2: 1}' }],
        consoleOutput: 'fib(2) = 1',
        explanation: 'Computed fib(2) = 1, stored result in memo[2] = 1 on heap.'
      },
      {
        stepNumber: 12,
        line: 17,
        codeLine: 'print("Done!")',
        callStack: [{ id: 'f1', name: '<module>', line: 17 }],
        variables: [
          { name: 'i', value: '9', type: 'int' },
          { name: 'result', value: '34', type: 'int' },
          { name: 'memo', value: '{2:1, 3:2, 4:3, 5:5, 6:8, 7:13, 8:21, 9:34}', type: 'dict' }
        ],
        stackMemory: [{ address: '0x7ffd10', name: '<module>', value: 'Frame' }],
        heapMemory: [{ address: '0x00A1', type: 'dict', value: '8 cached values' }],
        consoleOutput: 'Done!',
        explanation: 'Execution complete. Garbage collection ready.'
      }
    ]
  },
  {
    id: 'js-event-loop',
    name: 'JavaScript Event Loop & Microtasks',
    language: 'javascript',
    description: 'Visualizes synchronous execution vs Promise Microtask queue and setTimeout Task queue.',
    code: `// JavaScript Event Loop & Task Queue
console.log("Start");

setTimeout(() => {
  console.log("Timeout Task 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Microtask 1");
});

console.log("End");`,
    steps: [
      {
        stepNumber: 1,
        line: 2,
        codeLine: 'console.log("Start");',
        callStack: [{ id: 'f1', name: 'main()', line: 2 }],
        variables: [],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [],
        consoleOutput: 'Start',
        explanation: 'Synchronous execution: console.log("Start") executed immediately.'
      },
      {
        stepNumber: 2,
        line: 4,
        codeLine: 'setTimeout(..., 0)',
        callStack: [{ id: 'f1', name: 'main()', line: 4 }],
        variables: [{ name: 'Web API', value: 'Timer(0ms)', type: 'Timer' }],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [{ address: '0x08A0', type: 'TaskQueue', value: '[cb1]' }],
        explanation: 'Registered setTimeout callback to Web API Timer; queued into MacroTask Queue.'
      },
      {
        stepNumber: 3,
        line: 8,
        codeLine: 'Promise.resolve().then(...)',
        callStack: [{ id: 'f1', name: 'main()', line: 8 }],
        variables: [{ name: 'Microtasks', value: '1 pending', type: 'Queue' }],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [{ address: '0x08B0', type: 'MicrotaskQueue', value: '[Promise.then]' }],
        explanation: 'Promise resolved immediately. Added callback to Microtask Queue (Higher priority!).'
      },
      {
        stepNumber: 4,
        line: 12,
        codeLine: 'console.log("End");',
        callStack: [{ id: 'f1', name: 'main()', line: 12 }],
        variables: [],
        stackMemory: [{ address: '0x0100', name: 'CallStack', value: 'main()' }],
        heapMemory: [],
        consoleOutput: 'End',
        explanation: 'Printed "End". Call Stack is now empty.'
      },
      {
        stepNumber: 5,
        line: 9,
        codeLine: 'console.log("Promise Microtask 1");',
        callStack: [{ id: 'f2', name: 'microtaskCallback', line: 9 }],
        variables: [],
        stackMemory: [{ address: '0x0120', name: 'CallStack', value: 'microtask' }],
        heapMemory: [],
        consoleOutput: 'Promise Microtask 1',
        explanation: 'Event Loop flushed Microtask Queue FIRST before MacroTask Queue!'
      },
      {
        stepNumber: 6,
        line: 5,
        codeLine: 'console.log("Timeout Task 1");',
        callStack: [{ id: 'f3', name: 'timerCallback', line: 5 }],
        variables: [],
        stackMemory: [{ address: '0x0130', name: 'CallStack', value: 'timer' }],
        heapMemory: [],
        consoleOutput: 'Timeout Task 1',
        explanation: 'Event Loop pulled Task 1 from MacroTask Queue into Call Stack.'
      }
    ]
  },
  {
    id: 'cpp-pointers',
    name: 'C++ Pointers & Heap Memory Allocation',
    language: 'cpp',
    description: 'Traces stack vs heap pointer referencing, dereferencing, and delete memory deallocation.',
    code: `// C++ Pointer & Heap Memory Allocation
#include <iostream>

int main() {
    int a = 42;
    int* ptr = &a; // Pointer to stack variable
    
    int* heapPtr = new int(100); // Heap allocation
    
    *heapPtr = *ptr + 10;
    
    std::cout << "Heap Value: " << *heapPtr << std::endl;
    
    delete heapPtr; // Deallocate heap
    return 0;
}`,
    steps: [
      {
        stepNumber: 1,
        line: 5,
        codeLine: 'int a = 42;',
        callStack: [{ id: 'f1', name: 'main()', line: 5 }],
        variables: [{ name: 'a', value: '42', type: 'int' }],
        stackMemory: [{ address: '0x7ffc01', name: 'a', value: '42' }],
        heapMemory: [],
        explanation: 'Allocated 4 bytes on Stack frame for variable a = 42.'
      },
      {
        stepNumber: 2,
        line: 6,
        codeLine: 'int* ptr = &a;',
        callStack: [{ id: 'f1', name: 'main()', line: 6 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'ptr', value: '0x7ffc01', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc08', name: 'ptr', value: '0x7ffc01 (&a)' }
        ],
        heapMemory: [],
        explanation: 'Pointer ptr assigned address of a (&a = 0x7ffc01).'
      },
      {
        stepNumber: 3,
        line: 8,
        codeLine: 'int* heapPtr = new int(100);',
        callStack: [{ id: 'f1', name: 'main()', line: 8 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'ptr', value: '0x7ffc01', type: 'int*' },
          { name: 'heapPtr', value: '0x00FE90', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc08', name: 'ptr', value: '0x7ffc01' },
          { address: '0x7ffc10', name: 'heapPtr', value: '0x00FE90' }
        ],
        heapMemory: [{ address: '0x00FE90', type: 'int', value: '100' }],
        explanation: 'Dynamically allocated 4 bytes on HEAP at address 0x00FE90 with value 100.'
      },
      {
        stepNumber: 4,
        line: 10,
        codeLine: '*heapPtr = *ptr + 10;',
        callStack: [{ id: 'f1', name: 'main()', line: 10 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'heapPtr', value: '0x00FE90', type: 'int*' }
        ],
        stackMemory: [
          { address: '0x7ffc01', name: 'a', value: '42' },
          { address: '0x7ffc10', name: 'heapPtr', value: '0x00FE90' }
        ],
        heapMemory: [{ address: '0x00FE90', type: 'int', value: '52' }],
        explanation: 'Dereferenced ptr (*ptr=42), added 10 = 52, updated Heap block at 0x00FE90.'
      },
      {
        stepNumber: 5,
        line: 14,
        codeLine: 'delete heapPtr;',
        callStack: [{ id: 'f1', name: 'main()', line: 14 }],
        variables: [
          { name: 'a', value: '42', type: 'int' },
          { name: 'heapPtr', value: '0x00FE90 (freed)', type: 'int*' }
        ],
        stackMemory: [{ address: '0x7ffc01', name: 'a', value: '42' }],
        heapMemory: [],
        consoleOutput: 'Heap Value: 52',
        explanation: 'Explicitly freed heap memory at 0x00FE90 using delete operator.'
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    title: 'Identify the Maximum Call Stack Depth',
    difficulty: 'Easy',
    category: 'Recursion',
    question: 'When calling factorial(4), what is the maximum number of stack frames on the Call Stack simultaneously?',
    codeSnippet: `def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

factorial(4)`,
    options: ['3 frames', '4 frames', '5 frames', '6 frames'],
    correctAnswerIndex: 2, // 5 frames: main + factorial(4) + factorial(3) + factorial(2) + factorial(1)
    explanation: 'The call stack grows to 5 active frames: <module>, factorial(4), factorial(3), factorial(2), and factorial(1) before returning!'
  },
  {
    id: 'ch-2',
    title: 'Spot the Dangling Pointer',
    difficulty: 'Medium',
    category: 'Pointers',
    question: 'Which line of C++ code causes an invalid pointer reference to a deallocated memory region?',
    codeSnippet: `int* ptr = new int(10);
delete ptr;
std::cout << *ptr; // Line 3
ptr = nullptr;     // Line 4`,
    options: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    correctAnswerIndex: 2,
    explanation: 'Line 3 dereferences `*ptr` after calling `delete ptr;`, reading from freed heap memory (dangling pointer).'
  },
  {
    id: 'ch-3',
    title: 'JS Event Loop Priority',
    difficulty: 'Medium',
    category: 'Call Stack',
    question: 'What is the exact printed order of standard logs in this JavaScript snippet?',
    codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
    options: ['A, B, C, D', 'A, D, C, B', 'A, C, D, B', 'A, D, B, C'],
    correctAnswerIndex: 1,
    explanation: 'A and D run synchronously. Then Microtasks (Promise C) run before Macrotasks (setTimeout B), giving A, D, C, B!'
  }
];
