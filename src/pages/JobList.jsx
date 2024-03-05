import axios from "axios";
import { useEffect } from "react";
import { setError, setJobs, setLoading } from "../redux/slice/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";

const JobList = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.jobSlice);

  const fetchData = () => {
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch(() => dispatch(setError()));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="list-page">
      <Filter jobs={state.jobs} />

      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <p className="error">
          Üzgünüz verilere erişirken bir sorun oluştu{" "}
          <button onClick={fetchData} type="button" class="button">
            <span class="button__text">Yenile</span>
            <span class="button__icon">
              <img className="svg" src="refresh.svg" />
            </span>
          </button>
        </p>
      ) : (
        <div className="job-list">
          {state.jobs?.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
