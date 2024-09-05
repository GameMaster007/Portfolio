import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const commands = {
  help: "Available commands: about, skills, projects, education, contact, clear",
  about: "Benjamin Christy: Cybersecurity and Digital Forensics specialist with a passion for AI and innovation.",
  skills: `Technical Skills:
• Programming: Python, C++, JavaScript, Kotlin
• Operating Systems: Windows, Linux, macOS
• Tools: Wireshark, EnCase, Kali Linux, Metasploit, Autopsy, MySQL, Power BI
• Cybersecurity: Intrusion Detection, Malware Analysis, Risk Assessment
• Other: Bot Development, LLM Research

Languages:
• English (Advanced)
• Malayalam (Advanced)
• Hindi (Advanced)`,
  projects: `1. Smart Home Security System (Year 2)
   - Developed a comprehensive IoT-based smart home security system
   - Implemented facial recognition and anomaly detection

2. Blockchain-based Attendance System (Year 2)
   - Created a decentralized attendance system using blockchain technology
   - Ensured tamper-proof record-keeping and enhanced data integrity

3. M57.biz Digital Forensics Investigation
   - Conducted a full-scale digital forensics investigation on the M57.biz case
   - Uncovered critical evidence and presented detailed findings`,
  education: `Middlesex University London
• Degree: Bachelor of Science in Cybersecurity and Digital Forensics
• Expected Graduation: May 2025

Key Courses:
• Advanced Project Management in Cybersecurity
• Digital Forensics and Cyber Crime Investigation
• IoT Security and Ethical Hacking
• Secure Web Development and Penetration Testing
• Artificial Intelligence in Cybersecurity`,
  contact: `• Email: 513benchri@gmail.com
• Phone: +447470019737
• Location: 218A Preston Road, Wembley, Greater London, HA9 8PB
• LinkedIn: https://www.linkedin.com/in/benjamin-christy-919194186/
• GitHub: https://github.com`,
  clear: "Clearing terminal...",
}

export default function TerminalPortfolio() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([
    "Welcome to Benjamin Christy's Portfolio Terminal.",
    "Type 'help' for available commands.",
  ])
  const [showCursor, setShowCursor] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedInput = input.trim().toLowerCase()
    let response = `Unknown command: ${trimmedInput}. Type 'help' for available commands.`

    if (commands[trimmedInput]) {
      response = commands[trimmedInput]
      if (trimmedInput === 'clear') {
        setOutput([])
        setInput('')
        return
      }
    }

    setOutput((prev) => [...prev, `$ ${input}`, response])
    setInput('')
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm">benjamin_christy@portfolio:~</div>
        </div>
        
        <div className="h-[calc(100vh-8rem)] overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-800">
          <AnimatePresence>
            {output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="mb-1 whitespace-pre-wrap">{line}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            className="flex-grow bg-transparent border-none outline-none"
            aria-label="Terminal input"
            autoFocus
          />
          <span className={`w-2 h-5 bg-green-400 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
        </form>
      </div>
    </div>
  )
}
