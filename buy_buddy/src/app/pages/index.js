import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Image, Send, Mic, Plus, HelpCircle, User, LogOut, Menu } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [history, setHistory] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    // Save current chat to history
    if (searchQuery.trim()) {
      setHistory(prevHistory => [...prevHistory, searchQuery]);
    }
    // Redirect to search results page
    router.push(`/search?q=${searchQuery}`);
  };

  const handleNewChat = () => {
    // Save current chat to history and reset search query
    if (searchQuery.trim()) {
      setHistory(prevHistory => [...prevHistory, searchQuery]);
    }
    setSearchQuery('');
    // Keep user on the current page, reset state
    router.replace(router.asPath);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 border-r flex flex-col`}>
        <div className="p-4">
          <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white" onClick={handleNewChat}>
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
        </div>
        <div className="flex-grow"></div>
        <nav className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start mb-2">
            <HelpCircle className="mr-2 h-4 w-4" /> Help
          </Button>
          {session ? (
            <>
              <Link href="/account">
                <Button variant="ghost" className="w-full justify-start mb-2">
                  <User className="mr-2 h-4 w-4" /> My Account
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" /> Log Out
              </Button>
            </>
          ) : (
            <Button variant="ghost" className="w-full justify-start mb-2" onClick={() => signIn()}>
              <User className="mr-2 h-4 w-4" /> Sign In
            </Button>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center p-4 border-b">
          <Button variant="ghost" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex space-x-2 overflow-x-auto">
            <Button variant="outline" size="sm" className="whitespace-nowrap">Clear Prompt</Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">Example Prompt</Button>
            <Button variant="outline" size="sm" className="whitespace-nowrap">History Prompt</Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl md:text-4xl font-bold text-center mb-2">
            Ask Me Anything You want to Buy
          </h1>
          <p className="text-base md:text-lg text-gray-600 flex items-center">
            <Image className="h-5 w-5 mr-2" />
            Search For Anything and Get Everything
          </p>
        </main>

        {/* Footer Search Bar */}
        <footer className="p-4">
          <form onSubmit={handleSearch} className="relative">
            <Input 
              className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100" 
              placeholder="Search for your Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Mic className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button type="submit" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Send className="h-5 w-5 text-gray-400" />
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
