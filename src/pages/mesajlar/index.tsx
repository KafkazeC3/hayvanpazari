'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  ArrowLeft,
  Loader2,
  User,
  Clock,
  Check,
  CheckCheck,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  sender: { id: string; name: string; avatar: string | null };
  receiver: { id: string; name: string; avatar: string | null };
  listing?: { id: string; title: string; images: string };
}

interface Conversation {
  other_user_id: string;
  other_user_name: string;
  other_user_avatar: string | null;
  listing_id: string | null;
  listing_title: string | null;
  content: string;
  createdAt: string;
  unread_count: number;
}

export default function MessagesPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [mobileShowChat, setMobileShowChat] = useState(false);

  // Giriş kontrolü
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris?callbackUrl=/mesajlar');
    }
  }, [status, router]);

  // Konuşmaları getir
  const fetchConversations = useCallback(async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchConversations();
    }
  }, [session, fetchConversations]);

  // Seçili konuşmanın mesajlarını getir
  const fetchMessages = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/messages?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  const handleSelectConversation = (userId: string) => {
    setSelectedUser(userId);
    fetchMessages(userId);
    setMobileShowChat(true);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || sending) return;

    setSending(true);
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedUser,
          content: newMessage,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, data.message]);
        setNewMessage('');
        fetchConversations(); // Konuşma listesini güncelle
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const selectedConversation = conversations.find(
    (c) => c.other_user_id === selectedUser
  );

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-earth-50/30">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <Loader2 className="h-8 w-8 animate-spin text-nature-500" />
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-earth-50/30">
      <Navbar />

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden h-[calc(100vh-200px)]">
          <div className="flex h-full">
            {/* Conversations List */}
            <div
              className={cn(
                'w-full md:w-80 border-r border-earth-200 flex flex-col',
                mobileShowChat && 'hidden md:flex'
              )}
            >
              <div className="p-4 border-b border-earth-200">
                <h1 className="text-xl font-bold text-earth-800">Mesajlar</h1>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <MessageCircle className="h-12 w-12 text-earth-300 mb-2" />
                    <p className="text-earth-500">Henüz mesajınız yok</p>
                    <p className="text-sm text-earth-400 mt-1">
                      İlan sahipleriyle iletişime geçin
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-earth-100">
                    {conversations.map((conv) => (
                      <button
                        key={conv.other_user_id}
                        onClick={() => handleSelectConversation(conv.other_user_id)}
                        className={cn(
                          'w-full p-4 flex items-center gap-3 hover:bg-earth-50 transition-colors text-left',
                          selectedUser === conv.other_user_id && 'bg-nature-50 hover:bg-nature-50'
                        )}
                      >
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conv.other_user_avatar || ''} />
                          <AvatarFallback className="bg-nature-100 text-nature-600">
                            {conv.other_user_name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-earth-800 truncate">
                              {conv.other_user_name}
                            </h3>
                            {conv.unread_count > 0 && (
                              <span className="bg-harvest-500 text-white text-xs px-2 py-0.5 rounded-full">
                                {conv.unread_count}
                              </span>
                            )}
                          </div>
                          {conv.listing_title && (
                            <p className="text-xs text-nature-600 truncate">
                              {conv.listing_title}
                            </p>
                          )}
                          <p className="text-sm text-earth-500 truncate mt-0.5">
                            {conv.content}
                          </p>
                          <p className="text-xs text-earth-400 mt-1">
                            {formatDistanceToNow(conv.createdAt)}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div
              className={cn(
                'flex-1 flex flex-col',
                !mobileShowChat && 'hidden md:flex'
              )}
            >
              {selectedUser && selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-earth-200 flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="md:hidden"
                      onClick={() => setMobileShowChat(false)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={selectedConversation.other_user_avatar || ''}
                      />
                      <AvatarFallback className="bg-nature-100 text-nature-600">
                        {selectedConversation.other_user_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-earth-800">
                        {selectedConversation.other_user_name}
                      </h3>
                      {selectedConversation.listing_title && (
                        <p className="text-xs text-earth-500">
                          {selectedConversation.listing_title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => {
                        const isMe = message.senderId === session?.user?.id;
                        return (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={cn(
                              'flex',
                              isMe ? 'justify-end' : 'justify-start'
                            )}
                          >
                            <div
                              className={cn(
                                'max-w-[70%] px-4 py-2 rounded-2xl',
                                isMe
                                  ? 'bg-nature-600 text-white rounded-br-none'
                                  : 'bg-earth-100 text-earth-800 rounded-bl-none'
                              )}
                            >
                              <p>{message.content}</p>
                              <div
                                className={cn(
                                  'flex items-center gap-1 mt-1 text-xs',
                                  isMe ? 'text-white/70' : 'text-earth-500'
                                )}
                              >
                                <span>
                                  {new Date(
                                    message.createdAt
                                  ).toLocaleTimeString('tr-TR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })}
                                </span>
                                {isMe &&
                                  (message.isRead ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <Check className="h-3 w-3" />
                                  ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Input */}
                  <form
                    onSubmit={handleSendMessage}
                    className="p-4 border-t border-earth-200 flex gap-2"
                  >
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Mesajınızı yazın..."
                      className="flex-1"
                      disabled={sending}
                    />
                    <Button
                      type="submit"
                      disabled={sending || !newMessage.trim()}
                      className="gradient-nature text-white"
                    >
                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <MessageCircle className="h-16 w-16 text-earth-200 mb-4" />
                  <h3 className="text-lg font-semibold text-earth-800">
                    Bir konuşma seçin
                  </h3>
                  <p className="text-earth-500 mt-1">
                    Mesajlarınızı görüntülemek için sol taraftan bir konuşma
                    seçin
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
