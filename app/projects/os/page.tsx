'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ShellProjectPage() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-gray-800">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        OS/161 Shell Project – Multi-Process Kernel
      </motion.h1>

      <p className="text-lg mb-8">
        A full OS kernel extension for educational system OS/161, developed as part of the Operating Systems Internals course at Politecnico di Torino. The project introduces multi-programming to a previously single-process operating system by implementing process control, system calls, file and memory management.
      </p>

      <Section title="Project Scope" text="Enhance OS/161 kernel with support for:
- Multiprogramming (via fork, execv, waitpid)
- Virtual memory page allocation and release
- File operations with descriptor tables
- Directory traversal (getcwd, chdir)
- Concurrent system call handling via locks and spinlocks
- User-space shell (based on /bin/sh)" />

      <Section title="Key Implemented System Calls" text="- fork(), execv(), exit(), waitpid(), getpid()
- open(), close(), read(), write(), lseek(), dup2()
- getcwd(), chdir()" />

      <Section title="Memory and Process Architecture" text="Implemented bitmap-based virtual memory manager to replace static allocation, enabling memory reuse and clean deallocation. Added process table with child tracking, conditional variables, and hierarchical termination logic. Uses synchronization primitives to handle concurrent execution safely." />

      <Section title="Testing & Validation" text="Tested with OS/161's testbin programs:
- forktest: validates fork and getpid behavior
- badcall: stress-tests syscall error handling
- f_test: verifies correctness and concurrency of file I/O
- shell execution: validates execv by launching binaries from /bin/sh" />


      <div className="mt-10 flex justify-between items-center">
        <Link href="/" className="text-blue-600 hover:underline text-sm">
          ← Back to Projects
        </Link>
        <Link
          href="https://github.com/andre-carbo/os161shell.git"
          target="_blank"
          className="inline-block text-blue-600 hover:underline"
        >
          View Source Code on GitHub →
        </Link>
      </div>
    </section>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-base leading-relaxed text-gray-700 whitespace-pre-line">{text}</p>
    </div>
  );
}

