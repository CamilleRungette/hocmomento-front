import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import url from "../url";
import Lines3 from "../Components/Lines/Lines3";
import Event from "../Components/Event/Event";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { IoIosMore } from "react-icons/io";

const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [eventsYear, setEventsYear] = useState([]);
  const [eventsThisYear, setEventsThisYear] = useState([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  const date = new Date();
  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  // const thisYear = 2022;
  const years = [2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
  const months = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  useEffect(() => {
    axios
      .get(`${url}/events/events`)
      .then((res) => {
        const eventsArray = res.data;
        if (res.status === 200) {
          setEvents(eventsArray);
          let array = [];
          let arrayEventsYear = [];
          eventsArray.forEach((event) => {
            event.dates.forEach((date) => {
              if (!array.includes(new Date(date.startDate).getFullYear())) {
                array.push(new Date(date.startDate).getFullYear());
              }
              if (
                new Date(date.startDate).getFullYear() === thisYear &&
                !arrayEventsYear.includes(event)
              ) {
                arrayEventsYear.push(event);
              }
            });
          });

          setEventsYear(array);

          let arrayEventsThisYear = [...eventsThisYear];
          arrayEventsYear.forEach((event) => {
            event.dates.forEach((show) => {
              if (
                !arrayEventsThisYear[new Date(show.startDate).getMonth()].filter(
                  (item) => item._id === event._id
                ).length
              ) {
                arrayEventsThisYear[new Date(show.startDate).getMonth()].push(event);
              }
            });
          });

          setEventsThisYear(arrayEventsThisYear);
          // console.log("array", array);
          // console.log("arrayEventsYear", arrayEventsYear);
          // console.log("arrayEventsThisYear", arrayEventsThisYear);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="agenda-main">
        <div className="agenda-title">
          <h1>Agenda {thisYear} </h1>
        </div>

        <div className="agenda-lines1">
          <Lines3 />
        </div>
        {events.length ? (
          <div>
            <div className="future-events">
              {eventsThisYear.length ? (
                <ul className="no-list-style">
                  {eventsThisYear.map((month, i) => (
                    <li key={i} className="event">
                      {i >= thisMonth && month.length ? (
                        <div className="month">
                          <h2 className="event-month">
                            {months[i]} {thisYear}{" "}
                          </h2>
                          {month.map((show) => (
                            <Event key={show._id} event={show} index={i} thisYear={thisYear} />
                          ))}
                        </div>
                      ) : (
                        <div key={i}></div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="agenda-loading">
                  <img src="/images/loading-buffering.gif" alt="Loading data ..." />
                </div>
              )}
            </div>

            <div className="past-events">
              <h3>Dates passées</h3>
              {years.map((year, i) =>
                year <= thisYear && eventsYear.includes(year) ? (
                  <Accordion key={`year${i}`} className="accordion">
                    <AccordionSummary
                      expandIcon={<IoIosMore className="icon" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>{year}</h3>
                    </AccordionSummary>
                    {events.map((event, i) =>
                      new Date(event.dates[0].startDate).getFullYear() === year ? (
                        <AccordionDetails key={`event${i}`} className="event-details">
                          <h2>{event.title}</h2>
                          <div className="event-date">
                            <p>
                              {new Date(event.dates[0].startDate).getDate() ===
                              new Date(event.dates[0].endDate).getDate() ? (
                                <span>
                                  Le {new Date(event.dates[0].startDate).getDate()}{" "}
                                  {months[new Date(event.dates[0].startDate).getMonth()]}{" "}
                                </span>
                              ) : (
                                <span>
                                  Du {new Date(event.dates[0].startDate).getDate()}
                                  {new Date(event.dates[0].startDate).getMonth() !==
                                  new Date(event.dates[0].endDate).getMonth() ? (
                                    <span>
                                      {" "}
                                      {months[new Date(event.dates[0].startDate).getMonth()]}{" "}
                                    </span>
                                  ) : (
                                    <> </>
                                  )}
                                  au {new Date(event.dates[0].endDate).getDate()}{" "}
                                  {months[new Date(event.dates[0].endDate).getMonth()]}
                                </span>
                              )}
                            </p>

                            <p>{event.dates[0].place} </p>

                            <p>
                              {event.dates[0].address ? (
                                <span>{event.dates[0].address},</span>
                              ) : (
                                <></>
                              )}{" "}
                              {event.dates[0].city ? event.dates[0].city : <></>}
                            </p>
                          </div>
                        </AccordionDetails>
                      ) : (
                        <div key={`event${i}`}></div>
                      )
                    )}
                  </Accordion>
                ) : (
                  <div key={`year${i}`}></div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="loading-content">
            <img src="/images/loading.gif" alt="loading" />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Agenda;
