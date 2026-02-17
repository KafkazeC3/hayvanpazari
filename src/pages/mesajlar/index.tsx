'use client';

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { NavbarModern } from '@/components/NavbarModern';
import { FooterModern } from '@/components/FooterModern';
import { useMessages } from '@/hooks/useMessages';
import { 
  MessageCircle, 
  Send, 
  ChevronLeft, 
  Clock, 
  Check, 
  CheckCheck,
  Inbox,
  MoreVertical,
  Phone,
  User
} from 'lucide-react';

export default function MessagesPage() {
  const router = useRouter();
  const { to, listingId } = router.query;
  const { getConversations, sendMessage, markAsRead, unreadCount, mounted } = useMessages();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const conversations = getConversations();
  
  const activeConversation = conversations.find(c => c.key === selectedConversation);
  
  useEffect(() => {
    if (to && listingId) {
      const key = `${to}-${listingId}`;
      setSelectedConversation(key);
    } else if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].key);
    }
  }, [to, listingId, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    sendMessage({
      content: newMessage,
      senderId: 'me',
      senderName: 'Ben',
      receiverId: activeConversation.userId,
      receiverName: activeConversation.userName,
      listingId: activeConversation.listingId,
      listingTitle: activeConversation.listingTitle,
    });

    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Az önce';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} dk önce`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} saat önce`;
    return date.toLocaleDateString('tr-TR');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavbarModern />
        <div className="h-[calc(100vh-64px)] flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Mesajlarım | HayvanPazarı.com</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <NavbarModern />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
            <div className="flex h-full">
              {/* Sidebar - Conversations List */}
              <div className={`w-full md:w-80 border-r border-gray-200 flex flex-col ${selectedConversation ? 'hidden md:flex' : 'flex'}`}>
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Mesajlarım</h1>
                    {unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </div>

                {/* Conversations */}
                <div className="flex-1 overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Inbox className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">Henüz mesajınız yok</p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <button
                        key={conv.key}
                        onClick={() => {
                          setSelectedConversation(conv.key);
                          if (conv.unreadCount > 0) {
                            conv.messages.forEach(m => {
                              if (m.receiverId === 'me' && !m.isRead) {
                                markAsRead(m.id);
                              }
                            });
                          }
                        }}
                        className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                          selectedConversation === conv.key ? 'bg-green-50 border-l-4 border-l-green-500' : ''
                        }`}
                      >
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                          {conv.userName.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-gray-900 truncate">
                              {conv.userName}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatTime(conv.lastMessageTime)}
                            </span>
                          </div>
                          {conv.listingTitle && (
                            <p className="text-xs text-green-600 mb-1 truncate">
                              İlan: {conv.listingTitle}
                            </p>
                          )}
                          <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                            {conv.lastMessage}
                          </p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <span className="w-5 h-5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                            {conv.unreadCount}
                          </span>
                        )}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Area */}
              <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden md:flex'}`}>
                {activeConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setSelectedConversation(null)}
                          className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          {activeConversation.userName.charAt(0)}
                        </div>
                        <div>
                          <h2 className="font-semibold text-gray-900">{activeConversation.userName}</h2>
                          {activeConversation.listingTitle && (
                            <p className="text-xs text-green-600">
                              İlan: {activeConversation.listingTitle}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {activeConversation.messages.map((message) => {
                        const isMe = message.senderId === 'me';
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                                isMe
                                  ? 'bg-green-500 text-white rounded-br-md'
                                  : 'bg-gray-100 text-gray-900 rounded-bl-md'
                              }`}
                            >
                              <p>{message.content}</p>
                              <div
                                className={`flex items-center gap-1 mt-1 text-xs ${
                                  isMe ? 'text-green-100' : 'text-gray-400'
                                }`}
                              >
                                <span>{formatTime(message.createdAt)}</span>
                                {isMe && (
                                  message.isRead ? (
                                    <CheckCheck className="w-3 h-3" />
                                  ) : (
                                    <Check className="w-3 h-3" />
                                  )
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Mesajınızı yazın..."
                          className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!newMessage.trim()}
                          className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-10 h-10 text-green-500" />
                      </div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Mesajlarınız
                      </h2>
                      <p className="text-gray-500 max-w-sm">
                        Satıcılarla iletişime geçmek için ilanlardaki "Mesaj Gönder" butonunu kullanabilirsiniz.
                      </p>
                      <button
                        onClick={() => router.push('/ilanlar')}
                        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-full font-medium hover:bg-green-600 transition-colors"
                      >
                        İlanlara Göz At
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="hidden">
          <FooterModern />
        </div>
      </div>
    </>
  );
}
