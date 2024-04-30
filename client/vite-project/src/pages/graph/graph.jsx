import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChartComponent } from "../../components/Chart";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Button } from "@mui/material";

export const Graph = () => {
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const query = async () => {
    try {
      const response = await axios.get("http://localhost:8000/graph/getRam");
      setData(response.data);
      setFilteredData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const filterData = () => {
    if (firstDate && secondDate) {
      setFilteredData(
        data.filter(
          (i) =>
            dayjs(i.ts) >= dayjs(firstDate) &&
            dayjs(i.ts) <= dayjs(secondDate).add(1, "day")
        )
      );
    } else if (firstDate) {
      setFilteredData(data.filter((i) => dayjs(i.ts) >= dayjs(firstDate)));
    } else if (secondDate) {
      setFilteredData(
        data.filter((i) => dayjs(i.ts) <= dayjs(secondDate).add(1, "day"))
      );
    } else {
      return;
    }
  };
  const download = async () => {
    const data = {
      firstDate: firstDate
        ? dayjs(firstDate).format("YYYY-MM-DD") + "T00:00:00.000Z"
        : "",
      secondDate: secondDate
        ? dayjs(secondDate).add(1, "day").format("YYYY-MM-DD") +
          "T00:00:00.000Z"
        : "",
    };
    console.log(secondDate);
    const res = await axios.post(
      "http://localhost:8000/graph/downloadRam",
      data,
      {
        responseType: "blob",
      }
    );
    const blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "requests.xlsx");
    document.body.appendChild(link);
    link.click();
  };
  useEffect(() => {
    query();
  }, []);

  return (
    <div className="graph_container">
      <Header />
      <div className="graph_content_container">
        <div className="graph_date_filter">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DatePicker"]}
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "sticky",
                left: 0,
              }}
            >
              <DatePicker
                label="От"
                onChange={(newValue) => setFirstDate(newValue)}
                format="DD/MM/YYYY"
                value={firstDate}
              />
              <DatePicker
                label="До"
                format="DD/MM/YYYY"
                onChange={(newValue) => setSecondDate(newValue)}
                value={secondDate}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Button
            onClick={filterData}
            variant="contained"
            sx={{
              width: "300px",
              height: "50px",
              bgcolor: "#101828",
              "&:hover": {
                bgcolor: "#152544",
              },
            }}
          >
            Поиск
          </Button>
        </div>
        <div className="graph_chart_container">
          <ChartComponent array={filteredData} />
        </div>
        <div className="graph_download_button">
          <Button
            onClick={download}
            variant="contained"
            sx={{
              width: "300px",
              height: "50px",
              bgcolor: "#101828",
              "&:hover": {
                bgcolor: "#152544",
              },
            }}
          >
            Скачать данные в виде Excel
          </Button>
        </div>
      </div>
    </div>
  );
};
