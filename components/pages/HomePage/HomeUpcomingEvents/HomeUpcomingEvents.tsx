"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import Image from "next/image";
import "./style.scss";
import TitleLarge from "@/components/common/TitleLarge/TitleLarge";
import { Events } from "@/common/interfaces/interface";
import { EVENTS } from "@/common/queries/query";
import { graphQLClient } from "@/lib/graphql-client";

const events = [
	{
		date: new Date(2025, 6, 12),
		title: "The Inaugural Ceremony of ESOFT BIT & BBM Programmes 2022",
		color: "#7B61FF",
	},
	{
		date: new Date(2025, 5, 21),
		title: "Inaugural Ceremony Kingston University BSc. Top-Up Programme",
		color: "#F7B733",
	},
];

const HomeUpcomingEvents = () => {
  // const [events, setEvents] = useState<Events[]>([]);
  // const fetchNewsEvents = async () => {
  //     const data = await graphQLClient.request<{
  //       news: {
  //         nodes: Events[];
  //         pageInfo: { endCursor: string; hasNextPage: boolean };
  //       };
  //     }>(EVENTS);
  //     setEvents(data.news.nodes);
  //   };
  
  // useEffect(() => {
  //   fetchNewsEvents();
  // }, []);


	const [selectedDate, setSelectedDate] = useState(() => {
		// If there are events, set selectedDate to the month of the first event
		if (events.length > 0) {
			const firstEvent = events[0].date;
			// Set to first day of the event's month
			return new Date(firstEvent.getFullYear(), firstEvent.getMonth(), 1);
		}
		return new Date();
	});

	const tileContent = ({ date, view }: { date: Date; view: string }) => {
    // No bullet, just return null
    return null;
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const event = events.find(ev =>
        ev.date.getFullYear() === date.getFullYear() &&
        ev.date.getMonth() === date.getMonth() &&
        ev.date.getDate() === date.getDate()
      );
      // Return a unique class for each event color
      return event ? `has-event has-event-${event.color.replace('#', '')}` : null;
    }
    return null;
  };

	return (
		<section className="upcoming-events-section">
			<div className="upcoming-events-wrap">
				<div className="title-wrap mobile" >
					<TitleLarge title="Upcoming" subtitle="&nbsp;Events" />
				</div>
				<div className="calendar-block">
					<div className="title-wrap web" >
						<TitleLarge title="Upcoming" subtitle="&nbsp;Events" />
					</div>
					<div className="calendar-event-row">
						<div className="calendar calendar-styled">
							<Calendar
								value={selectedDate}
								tileContent={tileContent}      // renders a colored dot for event days
								tileClassName={tileClassName} // adds a class for event days
							/>
						</div>
						<div className="event-list">
							{events.map((event, idx) => {
                const dayNum = event.date.getDate();
                const weekday = event.date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
                const month = event.date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
                const year = event.date.getFullYear();
                return (
                  <React.Fragment key={idx}>
                    <div className="event-item">
                      <div className="dot" style={{ backgroundColor: event.color }}></div>
                      <div className="event-date-label">
                        <span className="event-day">{dayNum}</span>
                        {/* <span className="event-weekday" style={{ marginLeft: 4 }}>{weekday}</span> */}
                        <span className="event-month" style={{ marginLeft: 8 }}>{month}</span>
                        {/* <span className="event-year" style={{ marginLeft: 4 }}>{year}</span> */}
                      </div>
                      <div className="details">
                        <strong>{event.title}</strong>
                      </div>
                    </div>
                    {idx !== events.length - 1 && (
                      <div className="event-divider" />
                    )}
                  </React.Fragment>
                );
              })}
						</div>
					</div>
				</div>
				<div className="image-block">
					<Image
						src="/images/student.png" // replace with actual image path
						alt="Event Student"
						width={500}
						height={600}
						className="event-image"
					/>
				</div>
			</div>
		</section>
	);
};

export default HomeUpcomingEvents;