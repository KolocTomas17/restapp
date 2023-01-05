const info = document.getElementById("info");
const getAllBmwsBtn = document.getElementById("getAllBmwsBtn");
const getBmwByIdBtn = document.getElementById("getBmwByIdBtn");
const postBmwBtn = document.getElementById("postBmwBtn");
const putBmwBtn = document.getElementById("putBmwBtn");
const patchBmwBtn = document.getElementById("patchBmwBtn");
const deleteBmwBtn = document.getElementById("deleteBmwBtn");
const getBmwByIdInput = document.getElementById("getBmwByIdInput");
const postNameInput = document.getElementById("postNameInput");
const postYearInput = document.getElementById("postYearInput");
const putIdInput = document.getElementById("putIdInput");
const putNameInput = document.getElementById("putNameInput");
const putYearInput = document.getElementById("putYearInput");
const patchIdInput = document.getElementById("patchIdInput");
const patchNameInput = document.getElementById("patchNameInput");
const patchYearInput = document.getElementById("patchYearInput");
const deleteIdInput = document.getElementById("deleteIdInput");

const getAllBmwsEvent = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/Bmw", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    info.innerHTML = "";
    data.Bmws.map((Bmw) => {
      info.innerHTML += `<p>id: ${bmw._id}</p>`;
      info.innerHTML += `<p>name: ${bmw.name}</p>`;
      info.innerHTML += `<p>year: ${bmw.year}</p>`;
      info.innerHTML += `<p>request: ${Object.values(bmw.request)}</p>`;
      info.innerHTML += `<p><br></p>`;
    });
  } catch (error) {
    info.innerText = error;
  }
};
getAllBmwsBtn.onclick = getAllBmwsEvent;

const getBmwByIdEvent = async () => {
  try {
    const getBmwByIdInputValue = getBmwByIdInput.value;
    const res = await fetch(
      `http://127.0.0.1:3000/bmw/${getBmwByIdInputValue}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const data = await res.json();
    info.innerHTML = `<p>id: ${data._id}</p>`;
    info.innerHTML += `<p>name: ${data.name}</p>`;
    info.innerHTML += `<p>year: ${data.year}</p>`;
    info.innerHTML += `<p>request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerHTML = `<p>Bmw not found!</p>`
  }
};
getBmwByIdBtn.onclick = getBmwByIdEvent;

const postBmwEvent = async () => {
  try {
    const postNameInputValue = postNameInput.value;
    const postYearInputValue = postYearInput.value;
    const res = await fetch("http://127.0.0.1:3000/bmw", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: postNameInputValue,
        year: postYearInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.message}</p>`;
    info.innerHTML += `<p>Created bmw:</p>`;
    info.innerHTML += `<p>id: ${data.createdBmw._id}</p>`;
    info.innerHTML += `<p>name: ${data.createdBmw.name}</p>`;
    info.innerHTML += `<p>year: ${data.createdBmw.year}</p>`;
    info.innerHTML += `<p>payload: ${Object.values(
      data.createdBmw.payload
    )}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
postBmwBtn.onclick = postBmwEvent;

const putBmwEvent = async () => {
  try {
    const putIdInputValue = putIdInput.value;
    const putNameInputValue = putNameInput.value;
    const putYearInputValue = putYearInput.value;
    const res = await fetch(`http://127.0.0.1:3000/bmw/${putIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: putNameInputValue,
        year: putYearInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
putBmwBtn.onclick = putBmwEvent;

const patchBmwEvent = async () => {
  try {
    const patchIdInputValue = patchIdInput.value;
    const patchNameInputValue = patchNameInput.value;
    const patchYearInputValue = patchYearInput.value;
    let body = [];
    if (patchNameInputValue.trim().length) {
      const nameProp = {
        propName: "name",
        value: patchNameInputValue,
      };
      body.push(nameProp);
    }
    if (patchYearInputValue.trim().length) {
      const yearProp = {
        propName: "year",
        value: patchYearInputValue,
      };
      body.push(yearProp);
    }
    const res = await fetch(`http://127.0.0.1:3000/bmw/${patchIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(body)
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.msg}</p>`;
    info.innerHTML += `<p>Request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
patchBmwBtn.onclick = patchBmwEvent;

const deleteBmwEvent = async () => {
  try {
    const deleteIdInputValue = deleteIdInput.value;
    const res = await fetch(
      `http://127.0.0.1:3000/bmw/${deleteIdInputValue}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (!data) return info.innerHTML = `<p>bmw not found!</p>`;
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
deleteBmwBtn.onclick = deleteBmwEvent;
