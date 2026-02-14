'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

interface MessageButtonProps {
  listingId: string;
  sellerName: string;
  sellerAvatar?: string;
  listingTitle: string;
}

export function MessageButton({ 
  listingId, 
  sellerName, 
  sellerAvatar, 
  listingTitle 
}: MessageButtonProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    content: string;
    isMe: boolean;
    timestamp: Date;
  }>>([
    {
      id: '1',
      content: `Merhaba, "${listingTitle}" ilanınız hakkında bilgi almak istiyorum.`,
      isMe: false,
      timestamp: new Date(),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      id: Date.now().toString(),
      content: message,
      isMe: true,
      timestamp: new Date(),
    }]);
    setMessage('');
  };

  if (!session) {
    return (
      <Button 
        variant="outline" 
        className="w-full gap-2"
        onClick={() => window.location.href = '/giris?callbackUrl=' + window.location.pathname}
      >
        <MessageCircle className="h-4 w-4" />
        Mesaj Gönder (Giriş Yapın)
      </Button>
    );
  }

  return (
    <>
      <Button 
        className="w-full gradient-nature text-white gap-2"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-4 w-4" />
        Satıcıya Mesaj Gönder
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <Card className="w-full max-w-md h-[500px] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={sellerAvatar} />
                  <AvatarFallback>{sellerName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-earth-800">{sellerName}</h3>
                  <p className="text-xs text-earth-500">Çevrimiçi</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.isMe
                        ? 'bg-nature-600 text-white rounded-br-none'
                        : 'bg-earth-100 text-earth-800 rounded-bl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button size="icon" onClick={handleSend} className="gradient-nature text-white">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
