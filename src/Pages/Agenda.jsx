import React, { useEffect, useState } from "react";
import { Navbar, Footer, url, Lines3, Event } from "./_index.js";
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
  // const thisYear = 2021
  const years = [2023, 2022, 2021, 2020, 2019, 2018];
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
      .get(`${url}/events`)
      .then((res) => {
        let eventsArray = res.data.filter((event) => event.title !== "Test");
        if (res.status === 200) {
          setEvents(eventsArray);
          let array = [];
          let arrayEventsYear = [];
          eventsArray.forEach((event) => {
            array.push(new Date(event.dates[0].startDate).getFullYear());
            if (new Date(event.dates[0].startDate).getFullYear() === thisYear) {
              arrayEventsYear.push(event);
            }
          });
          setEventsYear(array);

          let arrayEventsThisYear = [...eventsThisYear];
          arrayEventsYear.forEach((event) => {
            event.dates.forEach((show) => {
              if (
                !arrayEventsThisYear[
                  new Date(show.startDate).getMonth()
                ].filter((item) => item._id === event._id).length
              ) {
                arrayEventsThisYear[new Date(show.startDate).getMonth()].push(
                  event
                );
              }
            });
          });

          setEventsThisYear(arrayEventsThisYear);
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
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
                      {month.length ? (
                        <div className="month">
                          <h2 className="event-month">
                            {months[i]} {thisYear}{" "}
                          </h2>
                          {month.map((show) => (
                            <Event key={show._id} event={show} index={i} />
                          ))}
                        </div>
                      ) : (
                        <></>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="agenda-loading">
                  <img
                    src="/images/loading-buffering.gif"
                    alt="Loading data ..."
                  />
                </div>
              )}
            </div>

            <div className="past-events">
              <h3>Dates passées</h3>
              {years.map((year) =>
                year < thisYear && eventsYear.includes(year) ? (
                  <Accordion
                    key={Math.floor(Math.random() * 10000)}
                    className="accordion"
                  >
                    <AccordionSummary
                      expandIcon={<IoIosMore className="icon" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h3>{year}</h3>
                    </AccordionSummary>
                    {events.map((event) =>
                      new Date(event.dates[0].startDate).getFullYear() ===
                      year ? (
                        <AccordionDetails
                          key={Math.floor(Math.random() * 10000)}
                          className="event-details"
                        >
                          <h2>{event.title}</h2>
                          <div className="event-date">
                            <p>
                              {new Date(event.dates[0].startDate).getDate() ===
                              new Date(event.dates[0].endDate).getDate() ? (
                                <span>
                                  Le{" "}
                                  {new Date(event.dates[0].startDate).getDate()}{" "}
                                  {
                                    months[
                                      new Date(
                                        event.dates[0].startDate
                                      ).getMonth()
                                    ]
                                  }{" "}
                                </span>
                              ) : (
                                <span>
                                  Du{" "}
                                  {new Date(event.dates[0].startDate).getDate()}
                                  {new Date(
                                    event.dates[0].startDate
                                  ).getMonth() !==
                                  new Date(
                                    event.dates[0].endDate
                                  ).getMonth() ? (
                                    <span>
                                      {" "}
                                      {
                                        months[
                                          new Date(
                                            event.dates[0].startDate
                                          ).getMonth()
                                        ]
                                      }{" "}
                                    </span>
                                  ) : (
                                    <> </>
                                  )}
                                  au{" "}
                                  {new Date(event.dates[0].endDate).getDate()}{" "}
                                  {
                                    months[
                                      new Date(
                                        event.dates[0].endDate
                                      ).getMonth()
                                    ]
                                  }
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
                              {event.dates[0].city ? (
                                event.dates[0].city
                              ) : (
                                <></>
                              )}
                            </p>
                          </div>
                        </AccordionDetails>
                      ) : (
                        <></>
                      )
                    )}
                  </Accordion>
                ) : (
                  <></>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="loading-content">
            <img src="/images/loading.gif" alt="loading" q />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Agenda;
