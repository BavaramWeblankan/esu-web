"use client";

import { useTheme } from "@/lib/ThemeContext";
import React, { useEffect, useState } from "react";
import "./style.scss";
import { FaChevronDown } from "react-icons/fa";

type Batch = {
  id: number;
  branch: string;
  code: string;
  medium_of_instructions: string;
  delivery_mode: string;
  date_starts: string;
  date_registration_ends: string;
  seats_total: number;
  seats_filled: number;
};

type ScheduleProps = {
  schedule: {
    batches: Batch[];
  }[];
};

const CourseSchedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [filteredBatches, setFilteredBatches] = useState<Batch[]>([]);
  const { color } = useTheme();

  useEffect(() => {
    if (schedule?.length > 0) {
      const allBatches = schedule[0].batches;

      const allowedBranches = ["Colombo", "Kandy"];

      const filteredByBranch = allBatches.filter((batch) =>
        allowedBranches.includes(batch.branch)
      );

      const filtered = selectedBranch
        ? filteredByBranch.filter(
            (batch) =>
              batch.branch.toLowerCase() === selectedBranch.toLowerCase()
          )
        : filteredByBranch;

      setFilteredBatches(filtered);
    }
  }, [schedule, selectedBranch]);

  //console.log(filteredBatches);

  return (
    <div className="course-details-wrapper" data-aos="zoom-in">
      <div id="section5" className="related-coures-div course-title">
        <h5>
          <span>
            Course <span style={{ color }}>Schedule</span>
          </span>
        </h5>
        <hr className="course-title-hr" />
      </div>
      <div>
        <div className="custom-select-wrapper">
          <select
            className="branch-select"
            name="select_branch"
            id="select_branch"
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
          </select>
          <span className="custom-icon">
            <FaChevronDown />
          </span>
        </div>
        <div className="schedule-table-wrap">
          <table className="batch-table">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Batch</th>
                <th>Delivery Mode</th>
                <th>Commencement Date</th>
                <th>Available Seats</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches?.length > 0 ? (
                filteredBatches.map((batch) => (
                  <tr key={batch.id}>
                    <td>
                      <span className="mobile-div">Branch:</span>
                      <div>{batch.branch}</div>
                    </td>
                    <td>
                      <span className="mobile-div">Batch:</span>
                      <div>
                        <p className="m-0 dark-not-change">{batch.code}</p>
                        <p className="m-0 dark-not-change">
                          (Medium: {batch.medium_of_instructions})
                        </p>
                      </div>
                    </td>
                    <td>
                      <span className="mobile-div">Delivery Mode:</span>
                      <div>{batch.delivery_mode}</div>
                    </td>
                    <td>
                      <span className="mobile-div">Commencement Date:</span>
                      <p className="m-0 dark-not-change">{batch.date_starts}</p>
                      <p className="m-0 last-register-div dark-not-change">
                        Register before {batch.date_registration_ends}
                      </p>
                    </td>
                    <td>
                      <span className="mobile-div">Available Seats:</span>
                      <div>{batch.seats_total - batch.seats_filled}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    No batches available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseSchedule;
