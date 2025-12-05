import React, { useState, useEffect } from 'react';
import { X, Bell, Clock, Pill, AlertCircle, Sparkles } from 'lucide-react';

const NotificationToast = ({ notification, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Slide in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide after 5 seconds
    const hideTimer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case 'before':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'onTime':
        return <Bell className="w-5 h-5 text-orange-400" />;
      case 'after':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'test':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      default:
        return <Pill className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColorClasses = () => {
    switch (notification.type) {
      case 'before':
        return 'border-cyan-500/50 bg-cyan-500/10';
      case 'onTime':
        return 'border-orange-500/50 bg-orange-500/10';
      case 'after':
        return 'border-red-500/50 bg-red-500/10';
      case 'test':
        return 'border-purple-500/50 bg-purple-500/10';
      default:
        return 'border-blue-500/50 bg-blue-500/10';
    }
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 w-80 max-w-sm
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div
        className={`
          rounded-xl border backdrop-blur-xl p-4 shadow-2xl
          ${getColorClasses()}
        `}
      >
        <div className="flex items-start space-x-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {notification.message}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              {new Date(notification.timestamp).toLocaleTimeString()}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const NotificationContainer = ({ notifications, onRemoveNotification }) => {
  // Only show the most recent 3 notifications as toasts
  const recentNotifications = notifications.slice(0, 3);

  return (
    <div className="fixed top-0 right-0 z-50 pointer-events-none">
      <div className="space-y-2 p-4">
        {recentNotifications.map((notification, index) => (
          <div 
            key={notification.id} 
            className="pointer-events-auto"
            style={{ 
              zIndex: 1000 - index,
              transform: `translateY(${index * 4}px)`,
            }}
          >
            <NotificationToast
              notification={notification}
              onRemove={onRemoveNotification}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationContainer;