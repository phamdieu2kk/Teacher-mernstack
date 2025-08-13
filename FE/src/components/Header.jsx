import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Header = ({ userName = "Admin", role = "ADMIN", dateTime }) => {
  const parts = [
    "Hệ thống tạo bởi",
    "Phạm Thị Ngọc Diệu",
    "phamdieu1503@gmail.com",
  ];

  const [text, setText] = useState("");
  const [stage, setStage] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const currentText = parts[stage];

    let charIndex = 0;
    let typingInterval = null;

    setText("");
    setFadeOut(false);

    typingInterval = setInterval(() => {
      charIndex++;
      setText(currentText.slice(0, charIndex));

      if (charIndex === currentText.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setFadeOut(true);
        }, 1500);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [stage]);

  useEffect(() => {
    if (fadeOut) {
      const timeout = setTimeout(() => {
        setStage((prev) => (prev + 1) % parts.length);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [fadeOut, parts.length]);

  const chars = text.split("");

  return (
    <Box
      sx={{
        height: 64,
        backgroundColor: '#f3e5f5', // nền tím nhạt đồng bộ sidebar
        display: 'flex',
        alignItems: 'center',
        px: 3,
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1201,
        boxSizing: 'border-box',
      }}
    >
      {/* Logo và tên hệ thống */}
      <Box sx={{ padding: 5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <img
          src="https://thcsnguyenbinhkhiem.dautieng.edu.vn/uploads/thcsnguyenbinhkhiem/news/2019_10/khoc.png"
          alt="School Logo"
          style={{ height: 36, userSelect: 'none' }}
        />
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: '#4a148c', userSelect: 'none', whiteSpace: 'nowrap' }} // chữ tím đậm
        >
          School System
        </Typography>

        {/* Ngày giờ */}
        <Typography
          variant="body2"
          sx={{
            color: "#4a148c", // chữ tím đậm
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            lineHeight: "24px",
            ml: 2,
            fontWeight: 600,
          }}
        >
          <AccessTimeIcon sx={{ fontSize: 16, color: '#4a148c' }} /> {/* icon tím đậm */}
          {dateTime}
        </Typography>

        {/* Hiệu ứng typing + fade từng chữ */}
        <Box
          sx={{
            display: "flex",
            ml: 1,
            borderRight: "2px solid #4a148c", // viền tím đậm
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontFamily: "monospace",
            color: "#4a148c", // chữ tím đậm
            height: 24,
            fontSize: "16px",
            lineHeight: "24px",
            alignItems: "center",
          }}
        >
          {chars.map((char, idx) => (
            <Typography
              key={idx}
              component="span"
              sx={{
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? "translateX(20px)" : "translateX(0)",
                transition: fadeOut
                  ? `opacity 0.8s ease ${idx * 30}ms, transform 0.8s ease ${idx * 30}ms`
                  : `opacity 0.3s ease ${idx * 150}ms, transform 0.3s ease ${idx * 150}ms`,
                display: "inline-block",
                fontSize: "0.8rem",
                lineHeight: "24px",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* User Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 30, height: 30, bgcolor: "#4a148c" }}> {/* nền tím đậm */}
          <AccountCircle sx={{ color: "#fff", fontSize: 30 }} />
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#4a148c" }}> {/* chữ tím đậm */}
            {userName}
          </Typography>
          <Box
            sx={{
              backgroundColor: "#4a148c",
              color: "#fff",
              px: 0.8,
              py: 0.2,
              borderRadius: 1,
              fontSize: "0.7rem",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {role}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
