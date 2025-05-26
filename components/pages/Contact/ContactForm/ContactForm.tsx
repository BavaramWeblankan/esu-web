"use client";

import React, { useEffect, useState } from "react";
import "./style.scss";
import { CoursesInquire } from "@/common/types/type";
import { graphQLClient } from "@/lib/graphql-client";
import { GET_COURSES_FOR_INQUIRE_FORM } from "@/common/queries/query";
import ButtonClick from "@/components/common/Button/ButtonClick";

const ContactForm = () => {
  const [courses, setCourses] = useState<CoursesInquire[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await graphQLClient.request<{
          branchTypes: any;
          courses: { nodes: CoursesInquire[] };
        }>(GET_COURSES_FOR_INQUIRE_FORM);

        const branchNodes = data.branchTypes.nodes;

        const filteredBranches = branchNodes.filter((branch: any) =>
          ["Kandy Campus", "Colombo Campus"].includes(branch.name)
        );

        const combinedCourses = filteredBranches
          .flatMap((branch: any) => branch.courses.nodes)
          .filter(
            (course: { slug: any }, index: any, self: { slug: any }[]) =>
              index ===
              self.findIndex((c: { slug: any }) => c.slug === course.slug)
          );

        // console.log("Filtered Courses:", combinedCourses);
        setCourses(combinedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }

    fetchCourses();
  }, []);

  // console.log("Courses:", courses);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nationality: "",
    nicPassport: "",
    branch: "",
    message: "",
    course: "",
    source: "ESU-Web Form",
  });

  const [status, setStatus] = useState("");

  const [documents, setDocuments] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // const payload = {
    //   firstname: formData.firstName,
    //   lastname: formData.lastName,
    //   phone: formData.phone,
    //   email: formData.email,
    //   course: formData.course,
    //   source: "ESU-Web Form",
    //   nationality: formData.nationality,
    //   notes: formData.message,
    //   nic_passport: formData.nicPassport,
    //   branch: formData.branch,
    // };

    const form = new FormData();
    form.append("firstname", formData.firstName);
    form.append("lastname", formData.lastName);
    form.append("phone", formData.phone);
    form.append("email", formData.email);
    form.append("course", formData.course);
    form.append("source", "ESU-Web Form");
    form.append("nationality", formData.nationality);
    form.append("notes", formData.message);
    form.append("nic_passport", formData.nicPassport);
    form.append("branch", formData.branch);

    documents.forEach((file) => {
      form.append("documents[]", file);
    });

    console.log("Form Data:", form);

    try {
      const response = await fetch(
        "https://publicapi.esoft.lk/api/v1/inquiries",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer 1100626|VPJcv2Y6wFiHPw4i60xdc1WQ2NMPUQgerXlYhOyI3a07cd1c`,
          },
          body: form,
        }
      );

      if (response.ok) {
        setStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          nationality: "",
          nicPassport: "",
          branch: "",
          message: "",
          course: "",
          source: "ESU-Web Form",
        });
        setDocuments([]);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.error("Submission error:", error);
    }
  };

  console.log("Payload values:", {
    ...formData,
    documents,
  });

  return (
    <>
      <form
        className="contact-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        data-aos="fade-up"
      >
        <h2 className="contact-form__title">Get in Touch with us</h2>
        {status === "success" && (
          <p className="inquire__success">
            Thank you! Your inquiry was submitted.
          </p>
        )}
        {status === "error" && (
          <p className="inquire__error">
            Oops! Something went wrong. Please try again. <br />
            Reach us at Hotline: +94 117 572 572 or Email: info@esu.lk
          </p>
        )}
        <div className="contact-form__grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Last Name<span>*</span>
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>
              Nationality <span>*</span>
            </label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            >
              <option value="">Select Nationality</option>
              <option value="AF">Afghan</option>
              <option value="Albanian" data-select2-id="select2-data-1214-q2xo">
                Albanian
              </option>
              <option value="Algerian">Algerian</option>
              <option value="American">American</option>
              <option value="American Samoan">American Samoan</option>
              <option value="Andorran">Andorran</option>
              <option value="Angolan">Angolan</option>
              <option value="Anguillan">Anguillan</option>
              <option value="Antarctican">Antarctican</option>
              <option value="Antigua and Barbuda national">
                Antigua and Barbuda national
              </option>
              <option value="Antillean">Antillean</option>
              <option value="Argentinian">Argentinian</option>
              <option value="Armenian">Armenian</option>
              <option value="Aruban">Aruban</option>
              <option value="Australian">Australian</option>
              <option value="Austrian">Austrian</option>
              <option value="Azerbaijani">Azerbaijani</option>
              <option value="Bahamian">Bahamian</option>
              <option value="Bahraini">Bahraini</option>
              <option value="Bangladeshi">Bangladeshi</option>
              <option value="Barbadian">Barbadian</option>
              <option value="Basotho">Basotho</option>
              <option value="Belarusian">Belarusian</option>
              <option value="Belgian">Belgian</option>
              <option value="Belizean">Belizean</option>
              <option value="Beninese">Beninese</option>
              <option value="Bermudian">Bermudian</option>
              <option value="Bhutanese">Bhutanese</option>
              <option value="Bolivian">Bolivian</option>
              <option value="Bosnia and Herzegovina national">
                Bosnia and Herzegovina national
              </option>
              <option value="Botswanan">Botswanan</option>
              <option value="Bouvet Island">Bouvet Island</option>
              <option value="Brazilian">Brazilian</option>
              <option value="British Indian Ocean Territory">
                British Indian Ocean Territory
              </option>
              <option value="British Virgin Islander">
                British Virgin Islander
              </option>
              <option value="Briton">Briton</option>
              <option value="Bruneian">Bruneian</option>
              <option value="Bulgarian">Bulgarian</option>
              <option value="Burkinabe">Burkinabe</option>
              <option value="Burmese">Burmese</option>
              <option value="Burundian">Burundian</option>
              <option value="Cambodian">Cambodian</option>
              <option value="Cameroonian">Cameroonian</option>
              <option value="Canadian">Canadian</option>
              <option value="Cape Verdean">Cape Verdean</option>
              <option value="Caymanian">Caymanian</option>
              <option value="Central African">Central African</option>
              <option value="Chadian">Chadian</option>
              <option value="Chilean">Chilean</option>
              <option value="Chinese">Chinese</option>
              <option value="Christmas Islander">Christmas Islander</option>
              <option value="Cocos Islander">Cocos Islander</option>
              <option value="Colombian">Colombian</option>
              <option value="Comorian">Comorian</option>
              <option value="Congolese">Congolese</option>
              <option value="Congolese">Congolese</option>
              <option value="Cook Islander">Cook Islander</option>
              <option value="Costa Rican">Costa Rican</option>
              <option value="Croat">Croat</option>
              <option value="Cuban">Cuban</option>
              <option value="Cypriot">Cypriot</option>
              <option value="Czech">Czech</option>
              <option value="Dane">Dane</option>
              <option value="Djiboutian">Djiboutian</option>
              <option value="Dominican">Dominican</option>
              <option value="Dominican">Dominican</option>
              <option value="East Timorese">East Timorese</option>
              <option value="Ecuadorian">Ecuadorian</option>
              <option value="Egyptian">Egyptian</option>
              <option value="Emirian">Emirian</option>
              <option value="Equatorial Guinean">Equatorial Guinean</option>
              <option value="Eritrean">Eritrean</option>
              <option value="Estonian">Estonian</option>
              <option value="Ethiopian">Ethiopian</option>
              <option value="Faeroese">Faeroese</option>
              <option value="Falkland Islander">Falkland Islander</option>
              <option value="Fiji Islander">Fiji Islander</option>
              <option value="Filipino">Filipino</option>
              <option value="Finn">Finn</option>
              <option value="French">French</option>
              <option value="French Southern Territories">
                French Southern Territories
              </option>
              <option value="Gabonese">Gabonese</option>
              <option value="Gambian">Gambian</option>
              <option value="Georgian">Georgian</option>
              <option value="German">German</option>
              <option value="Ghanaian">Ghanaian</option>
              <option value="Gibraltarian">Gibraltarian</option>
              <option value="Greek">Greek</option>
              <option value="Greenlander">Greenlander</option>
              <option value="Grenadian">Grenadian</option>
              <option value="Guadeloupean">Guadeloupean</option>
              <option value="Guamanian">Guamanian</option>
              <option value="Guatemalan">Guatemalan</option>
              <option value="Guianese">Guianese</option>
              <option value="Guinea-Bissau national">
                Guinea-Bissau national
              </option>
              <option value="Guinean">Guinean</option>
              <option value="Guyanese">Guyanese</option>
              <option value="Haitian">Haitian</option>
              <option value="Heard Island and McDonald Islands">
                Heard Island and McDonald Islands
              </option>
              <option value="Honduran">Honduran</option>
              <option value="Hong Kong Chinese">Hong Kong Chinese</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Icelander">Icelander</option>
              <option value="Indian">Indian</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Iranian">Iranian</option>
              <option value="Iraqi">Iraqi</option>
              <option value="Irish">Irish</option>
              <option value="Israeli">Israeli</option>
              <option value="Italian">Italian</option>
              <option value="Ivorian">Ivorian</option>
              <option value="Jamaican">Jamaican</option>
              <option value="Japanese">Japanese</option>
              <option value="Jordanian">Jordanian</option>
              <option value="Kazakh">Kazakh</option>
              <option value="Kenyan">Kenyan</option>
              <option value="Kiribatian">Kiribatian</option>
              <option value="Kuwaiti">Kuwaiti</option>
              <option value="Kyrgyz">Kyrgyz</option>
              <option value="Lao">Lao</option>
              <option value="Latvian">Latvian</option>
              <option value="Lebanese">Lebanese</option>
              <option value="Liberian">Liberian</option>
              <option value="Libyan">Libyan</option>
              <option value="Liechtensteiner">Liechtensteiner</option>
              <option value="Lithuanian">Lithuanian</option>
              <option value="Luxembourger">Luxembourger</option>
              <option value="Macanese">Macanese</option>
              <option value="Macedonian">Macedonian</option>
              <option value="Mahorais">Mahorais</option>
              <option value="Malagasy">Malagasy</option>
              <option value="Malawian">Malawian</option>
              <option value="Malaysian">Malaysian</option>
              <option value="Maldivian">Maldivian</option>
              <option value="Malian">Malian</option>
              <option value="Maltese">Maltese</option>
              <option value="Marshallese">Marshallese</option>
              <option value="Martinican">Martinican</option>
              <option value="Mauritanian">Mauritanian</option>
              <option value="Mauritian">Mauritian</option>
              <option value="Mexican">Mexican</option>
              <option value="Micronesian">Micronesian</option>
              <option value="Moldovan">Moldovan</option>
              <option value="Monegasque">Monegasque</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Montenegrian">Montenegrian</option>
              <option value="Montserratian">Montserratian</option>
              <option value="Moroccan">Moroccan</option>
              <option value="Mozambican">Mozambican</option>
              <option value="Namibian">Namibian</option>
              <option value="Nauruan">Nauruan</option>
              <option value="Nepalese">Nepalese</option>
              <option value="Netherlander">Netherlander</option>
              <option value="New Caledonian">New Caledonian</option>
              <option value="New Zealander">New Zealander</option>
              <option value="Nicaraguan">Nicaraguan</option>
              <option value="Nigerian">Nigerian</option>
              <option value="Nigerien">Nigerien</option>
              <option value="Niuean">Niuean</option>
              <option value="Norfolk Islander">Norfolk Islander</option>
              <option value="North Korean">North Korean</option>
              <option value="Northern Mariana Islander">
                Northern Mariana Islander
              </option>
              <option value="Norwegian">Norwegian</option>
              <option value="Omani">Omani</option>
              <option value="Pakistani">Pakistani</option>
              <option value="Palauan">Palauan</option>
              <option value="Panamanian">Panamanian</option>
              <option value="Papua New Guinean">Papua New Guinean</option>
              <option value="Paraguayan">Paraguayan</option>
              <option value="Peruvian">Peruvian</option>
              <option value="Pitcairner">Pitcairner</option>
              <option value="Pole">Pole</option>
              <option value="Polynesian">Polynesian</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Puerto Rican">Puerto Rican</option>
              <option value="Qatari">Qatari</option>
              <option value="Reunionese">Reunionese</option>
              <option value="Romanian">Romanian</option>
              <option value="Russian">Russian</option>
              <option value="Rwandan">Rwandan</option>
              <option value="Sahrawi">Sahrawi</option>
              <option value="Saint Helenian">Saint Helenian</option>
              <option value="Saint Kitts and Nevis national">
                Saint Kitts and Nevis national
              </option>
              <option value="Saint Lucian">Saint Lucian</option>
              <option value="Saint Pierre and Miquelon national">
                Saint Pierre and Miquelon national
              </option>
              <option value="Salvadorian">Salvadorian</option>
              <option value="Samoan">Samoan</option>
              <option value="San Marinese">San Marinese</option>
              <option value="São Toméan">São Toméan</option>
              <option value="Saudi Arabian">Saudi Arabian</option>
              <option value="Senegalese">Senegalese</option>
              <option value="Serbian">Serbian</option>
              <option value="Seychellois">Seychellois</option>
              <option value="Sierra Leonean">Sierra Leonean</option>
              <option value="Singaporean">Singaporean</option>
              <option value="Slovak">Slovak</option>
              <option value="Slovene">Slovene</option>
              <option value="Solomon Islander">Solomon Islander</option>
              <option value="Somali">Somali</option>
              <option value="South African">South African</option>
              <option value="South Georgia and the South Sandwich Islands">
                South Georgia and the South Sandwich Islands
              </option>
              <option value="South Korean">South Korean</option>
              <option value="Spaniard">Spaniard</option>
              <option value="Sri Lankan">Sri Lankan</option>
              <option value="Sudanese">Sudanese</option>
              <option value="Surinamer">Surinamer</option>
              <option value="Svalbard and Jan Mayen">
                Svalbard and Jan Mayen
              </option>
              <option value="Swazi">Swazi</option>
              <option value="Swede">Swede</option>
              <option value="Swiss">Swiss</option>
              <option value="Syrian">Syrian</option>
              <option value="Taiwanese">Taiwanese</option>
              <option value="Tajik">Tajik</option>
              <option value="Tanzanian">Tanzanian</option>
              <option value="Thai">Thai</option>
              <option value="Togolese">Togolese</option>
              <option value="Tokelauan">Tokelauan</option>
              <option value="Tongan">Tongan</option>
              <option value="Trinidad and Tobago national">
                Trinidad and Tobago national
              </option>
              <option value="Tunisian">Tunisian</option>
              <option value="Turk">Turk</option>
              <option value="Turkmen">Turkmen</option>
              <option value="Turks and Caicos Islander">
                Turks and Caicos Islander
              </option>
              <option value="Tuvaluan">Tuvaluan</option>
              <option value="Ugandan">Ugandan</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="United States Minor Outlying Islands">
                United States Minor Outlying Islands
              </option>
              <option value="Uruguayan">Uruguayan</option>
              <option value="US Virgin Islander">US Virgin Islander</option>
              <option value="Uzbek">Uzbek</option>
              <option value="Vanuatuan">Vanuatuan</option>
              <option value="Vatican">Vatican</option>
              <option value="Venezuelan">Venezuelan</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Vincentian">Vincentian</option>
              <option value="Wallis and Futuna Islander">
                Wallis and Futuna Islander
              </option>
              <option value="Yemeni">Yemeni</option>
              <option value="Zambian">Zambian</option>
              <option value="Zimbabwean">Zimbabwean</option>
              <option value="Åland Islander">Åland Islander</option>
            </select>
          </div>
          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+94 77 123 4567"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>NIC/Passport</label>
            <input
              type="text"
              name="nicPassport"
              placeholder="Enter NIC/Passport"
              value={formData.nicPassport}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Branch</label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            >
              <option value="">Select Branch</option>
              <option value="Colombo">Colombo</option>
              <option value="Kandy">Kandy</option>
            </select>
          </div>
          <div className="form-group">
            <label>Academic Programme</label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option value={course?.courses?.courseCode} key={course.slug}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group full-width">
          <label>
            Documents (Can upload Multiple Files)
            <span className="file-note">(jpeg or png)</span>
          </label>
          <label className="upload-box">
            + Add Attachment
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="form-group full-width">
          <label>
            Message<span>*</span>
          </label>
          <textarea
            rows={4}
            name="message"
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="submit-btn">
          <button type="submit">Send Now</button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
