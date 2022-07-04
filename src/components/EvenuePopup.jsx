import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EventHeader from "./EventHeader";
import { gsap } from "gsap";

gsap.registerPlugin(CustomEase);

function EvenuePopup({ events, name, distance }) {
  console.log("EvenuePopup events: ", events);

  var scrollTimeout;
  var cardId;
  function scrollingListener() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      gsap.to(`#card-${cardId}`, {
        y: -100,
        rotation: 15,
        duration: 0.3,
        repeat: 1,
        yoyo: true,
        delay: 0.1,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.13,-0.066 0.406,-0.148 0.618,-0.208 0.691,-0.228 1.01,0.628 1,1 "
        ),
      });
      document.removeEventListener("scroll", scrollingListener);
    }, 50);
  }

  function onNameClick(id) {
    cardId = id;
    document.querySelector(`#card-${id}`).scrollIntoView({
      behavior: "smooth",
    });
    document.addEventListener("scroll", scrollingListener);
  }

  const card = (
    <React.Fragment>
      <CardContent sx={{ padding: 1 }} className="pb-2">
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          className="mt-0 mb-1"
        >
          {name}
        </Typography>
        {events.map((event) => (
          <EventHeader
            event={event}
            onNameClick={() => onNameClick(event.id)}
            key={event.id}
          />
        ))}
        <Typography sx={{ fontSize: 12, pb: 0 }} color="text.secondary">
          {"Distance: " + distance + " km"}
        </Typography>
      </CardContent>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: 1, height: 1 / 2 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}

export default EvenuePopup;
