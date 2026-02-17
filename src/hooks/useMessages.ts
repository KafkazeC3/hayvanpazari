'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  listingId?: string;
  listingTitle?: string;
  createdAt: string;
  isRead: boolean;
}

const STORAGE_KEY = 'hayvanpazari_messages';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      } else {
        // Mock mesajlar
        const mockMessages: Message[] = [
          {
            id: '1',
            content: 'Merhaba, ineğiniz hakkında bilgi alabilir miyim?',
            senderId: 'user1',
            senderName: 'Mehmet Kaya',
            receiverId: 'me',
            receiverName: 'Ben',
            listingId: '1',
            listingTitle: 'Holstein Friesian Süt İnekleri',
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            isRead: false,
          },
          {
            id: '2',
            content: 'Fiyatta pazarlık payı var mı?',
            senderId: 'me',
            senderName: 'Ben',
            receiverId: 'user2',
            receiverName: 'Ali Demir',
            listingId: '3',
            listingTitle: 'Brahman Boğa',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
            isRead: true,
          },
        ];
        setMessages(mockMessages);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockMessages));
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, mounted]);

  const sendMessage = useCallback((message: Omit<Message, 'id' | 'createdAt' | 'isRead'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages(prev => [newMessage, ...prev]);
    return newMessage;
  }, []);

  const markAsRead = useCallback((messageId: string) => {
    setMessages(prev => 
      prev.map(m => m.id === messageId ? { ...m, isRead: true } : m)
    );
  }, []);

  const getConversations = useCallback(() => {
    const conversations = new Map<string, Message[]>();
    
    messages.forEach(message => {
      const otherUserId = message.senderId === 'me' ? message.receiverId : message.senderId;
      const key = `${otherUserId}-${message.listingId || 'general'}`;
      
      if (!conversations.has(key)) {
        conversations.set(key, []);
      }
      conversations.get(key)!.push(message);
    });

    return Array.from(conversations.entries()).map(([key, msgs]) => {
      const lastMessage = msgs[0];
      const otherUserId = lastMessage.senderId === 'me' ? lastMessage.receiverId : lastMessage.senderId;
      const otherUserName = lastMessage.senderId === 'me' ? lastMessage.receiverName : lastMessage.senderName;
      const unreadCount = msgs.filter(m => m.receiverId === 'me' && !m.isRead).length;
      
      return {
        key,
        userId: otherUserId,
        userName: otherUserName,
        listingId: lastMessage.listingId,
        listingTitle: lastMessage.listingTitle,
        lastMessage: lastMessage.content,
        lastMessageTime: lastMessage.createdAt,
        unreadCount,
        messages: msgs.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
      };
    }).sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime());
  }, [messages]);

  const getUnreadCount = useCallback(() => {
    return messages.filter(m => m.receiverId === 'me' && !m.isRead).length;
  }, [messages]);

  return {
    messages,
    sendMessage,
    markAsRead,
    getConversations,
    unreadCount: getUnreadCount(),
    mounted,
  };
}
