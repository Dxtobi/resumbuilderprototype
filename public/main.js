function dateFun(date) {
  console.log(date)
  const mnt = ['Jen', 'Feb', 'Mach', 'April', 'May', 'Jun', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec']
  const y = new Date(date).getFullYear()
  const m = new Date(date).getMonth()

  const dateR = `${mnt[m]} ${y}`
  console.log(dateR)
  return dateR

}
let resume = {

  education: [],
  
  workExperience: [],

  skills:[]

};

//Clicked to append a new education
function addEducationField() {
  const educationFields = document.getElementById('education_fields');
  let school = document.getElementById('school').value;
  let degree = document.getElementById('degree').value;
  let from = document.getElementById('schoolFrom').value;
  let to = document.getElementById('schoolTo').value;


  saveArrayEddInput(school, degree, from, to)
  document.getElementById('school').value = '';
  document.getElementById('degree').value = '';
  document.getElementById('schoolFrom').value = '';
  document.getElementById('schoolTo').value = '';


  const newField = document.createElement('div');
    newField.innerHTML = `
      <div class='pre-div-holder'>
        <div class='pre-div'>${school}</div>
        <div class='pre-div'>${degree}</div>
        <div class='pre-div'>${dateFun(from)}-${dateFun(to)}</div>
      </div>
    `;
    educationFields.prepend(newField);
}
  
//Clicked to append a new experience
function addWorkExperienceField() {
  const workExperienceFields = document.getElementById('work_experience_fields');
  let comp = document.getElementById('company').value;
  let poss = document.getElementById('position').value;
  let from = document.getElementById('experienceFrom').value;
  let to = document.getElementById('experienceTo').value;

  saveArrayWorkInput(comp, poss, from, to)
  document.getElementById('company').value = '';
  document.getElementById('position').value = '';
  document.getElementById('experienceFrom').value = '';
  document.getElementById('experienceTo').value = '';

    const newField = document.createElement('div');
    newField.innerHTML = `
    <div class='pre-div-holder'>
    <div class='pre-div'>${comp}</div>
    <div class='pre-div'>${poss}</div>
    <div class='pre-div'>${dateFun(from)}-${dateFun(to)}</div>
  </div>

      `;
      workExperienceFields.prepend(newField);
}

//Clicked to append a new experience
function addSkills() {
  const skillsDev = document.getElementById('skills-dev');
  let skills = document.getElementById('skills').value;
  let level = document.getElementById('range').value;

  saveArraySkillsInput(skills, level)
  document.getElementById('skills').value = '';
  document.getElementById('range').value = '0';
    const newField = document.createElement('div');
    newField.innerHTML = `
    <div class='pre-div-holder'>
    <div class='pre-flex'>
      <div class='pre-div'>${skills}</div>
      <div >${level}/100</div>
      </div>
      <div class='range-indicator'>
        <div class='range-color' style='width: ${level}%'></div>
      </div>
    </div>
        `;
    skillsDev.prepend(newField);
}




//save all to object
function saveResume() {
  resume.name = document.getElementById('name').value;
  resume.email = document.getElementById('email').value;
  resume.phone = document.getElementById('phone').value;
  resume.education = [];
  const educationFields = document.querySelectorAll('#education_fields input');
  for (let i = 0; i < educationFields.length; i += 2) {
    const education = {};
    education.school = educationFields[i].value;
    education.degree = educationFields[i + 1].value;
    resume.education.push(education);
  }
  resume.workExperience = [];
  const workExperienceFields = document.querySelectorAll('#work_experience_fields input');
  for (let i = 0; i < workExperienceFields.length; i += 2) {
    const workExperience = {};
    workExperience.company = workExperienceFields[i].value;
    workExperience.position = workExperienceFields[i + 1].value;
    resume.workExperience.push(workExperience);
  }
  resume.skills = document.getElementById('skills').value;
  console.log(resume)
  return resume;
}

//called on blur each time a input is no longer on focused
function saveInput(event) {
  const resumeDB = JSON.parse(localStorage.getItem('resume'))
  if (resumeDB === null) {
    return saveResumeToLocalStorage()
  }
  console.log(resumeDB)
  const input = event.target;
  resumeDB[input.id] = input.value;
  localStorage.setItem('resume', JSON.stringify(resumeDB));
  
  resume = resumeDB
  console.log(resume);
  displayResume(resume);
  return resume;
}


//save array education
function saveArrayEddInput(school, degree, from, to) {
  const resumeDB = JSON.parse(localStorage.getItem('resume'))
  const education = {};
  education.school = school;
  education.degree = degree;
  education.from = from;
  education.to = to;

  resumeDB.education.push(education);
  localStorage.setItem('resume', JSON.stringify(resumeDB));
  resume = resumeDB
  displayResume(resume)
  return resume;
}

//save work experience in array
function saveArrayWorkInput(company, position, from, to) {
  const resumeDB = JSON.parse(localStorage.getItem('resume'))
  const workExperience = {};
  workExperience.company = company;
  workExperience.position = position;
  workExperience.from = from;
  workExperience.to = to;
  
  resumeDB.workExperience.push(workExperience);
  localStorage.setItem('resume', JSON.stringify(resumeDB));
  resume = resumeDB
  displayResume(resume)
  return resume;
}

//save array skills education
function saveArraySkillsInput(skill, level) {
  const resumeDB = JSON.parse(localStorage.getItem('resume'))
  const skills = {};
  skills.skill = skill;
  skills.level = level;
  resumeDB.skills.push(skills);
  localStorage.setItem('resume', JSON.stringify(resumeDB));
  resume = resumeDB
  displayResume(resume)
  return resume;
}



document.getElementById('name').addEventListener('blur', saveInput);
document.getElementById('email').addEventListener('blur', saveInput);
document.getElementById('phone').addEventListener('blur', saveInput);

document.getElementById('about').addEventListener('blur', saveInput);
document.getElementById('hubbies').addEventListener('blur', saveInput);








//display the resume data:{} [ON UPDATE]


function displayResume(resume) {
  
  document.getElementById('name_div').innerHTML = resume.name;
  document.getElementById('email_div').innerHTML = resume.email;
  document.getElementById('phone_div').innerHTML = resume.phone;
  document.getElementById('hobbies_div').innerHTML = resume.hubbies;
  document.getElementById('about_div').innerHTML = resume.about;
  
  //MAP THROUGH EDUCATION ARRAY
  let educationHTML = '';
  for (const education of resume.education) {
    educationHTML += `
      <div class='div-flex-din'>
        <div class='date-info' contenteditable="true">${dateFun(education.from)} - ${dateFun(education.to)}</div>
        <div class='degree-info' contenteditable="true">${education.degree}</div> 
        <div class='school-info' contenteditable="true"> ${education.school}</div>
      </div>
    `;
  }
  document.getElementById('education_div').innerHTML = educationHTML;

  //MAP THROUGH EXPERIENCE ARRAY
  let workExperienceHTML = '';
  for (const workExperience of resume.workExperience) {
    workExperienceHTML += `
      <div class='div-flex-din'>
        <div class='date-info' contenteditable="true">${dateFun(workExperience.from)} - ${dateFun(workExperience.to)}</div>
        <div class='degree-info' contenteditable="true">${workExperience.company}</div> 
        <div class='school-info' contenteditable="true">${workExperience.position}</div> 
      </div>
    `;
  }
  document.getElementById('work_experience_div').innerHTML = workExperienceHTML;
  
  //MAP THROUGH SKILLS ARRAY
  let skillsDev = '';
  for (const skill of resume.skills) {
    skillsDev += `
      <div>
        <div class='pre-flex'>
          <div class='pre-div' contenteditable="true">${skill.skill}</div>
          <div >${skill.level}/100</div>
        </div>
        <div class='range-indicator'>
          <div class='range-color' style='width: ${skill.level}%'></div>
        </div>
      </div>
    `;
  }
  document.getElementById('skills_div').innerHTML = skillsDev;
  
}


function saveResumeToLocalStorage() {
  localStorage.setItem('resume', JSON.stringify(resume));
}

function resetLocalStorage() {
  localStorage.removeItem('resume');
}

//after a submit button is click [ON SUBMIT]
document.getElementById('resume_form').addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('done')
});

(function () {
  const resume = localStorage.getItem('resume')
  if (resume === null) {
    saveResumeToLocalStorage()
  }
  displayResume(JSON.parse(resume))
})()