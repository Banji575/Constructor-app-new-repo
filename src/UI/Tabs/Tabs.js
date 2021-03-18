import React from 'react'

const Tabs = ({ nameArr }) => {
    console.log(nameArr)
    return (
       /*  <React.Fragment>
            <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
                {nameArr.map((el, i) => {
                    return (
                        <li key={i} class="nav-item" role="presentation">
                            <p
                                class="nav-link active"
                                id={`ex1-tab-1${i}`}
                                data-mdb-toggle="tab"
                                href={`#ex1-tabs-${i}`}
                                role="tab"
                                aria-controls={`ex1-tab-1${i}`}
                                aria-selected="true"
                            >{el}</p>
                        </li>
                    )
                })}
                <div class="tab-content" id="ex1-content">
                    {nameArr.map((el, i) => {
                        return (
                            <React.Fragment>
                                <div
                                    class="tab-pane fade show active"
                                    id={`ex1-tab-1${i}`}
                                    role="tabpanel"
                                    aria-labelledby={`ex1-tab-1${i}`}
                                >
                                    Tab 1 content
  </div>

                            </React.Fragment>
                        )
                    })}
                </div>
            </ul>

        </React.Fragment>
    */
                    <React.Fragment>
                        <ul class="nav nav-tabs mb-3" id="ex1" role="tablist">
  <li class="nav-item" role="presentation">
    <a
      class="nav-link active"
      id="ex1-tab-1"
      data-mdb-toggle="tab"
      href="#ex1-tabs-1"
      role="tab"
      aria-controls="ex1-tabs-1"
      aria-selected="true"
      >Tab 1</a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="ex1-tab-2"
      data-mdb-toggle="tab"
      href="#ex1-tabs-2"
      role="tab"
      aria-controls="ex1-tabs-2"
      aria-selected="false"
      >Tab 2</a
    >
  </li>
  <li class="nav-item" role="presentation">
    <a
      class="nav-link"
      id="ex1-tab-3"
      data-mdb-toggle="tab"
      href="#ex1-tabs-3"
      role="tab"
      aria-controls="ex1-tabs-3"
      aria-selected="false"
      >Tab 3</a
    >
  </li>
</ul>



<div class="tab-content" id="ex1-content">
  <div
    class="tab-pane fade show active"
    id="ex1-tabs-1"
    role="tabpanel"
    aria-labelledby="ex1-tab-1"
  >
    Tab 1 content
  </div>
  <div class="tab-pane fade" id="ex1-tabs-2" role="tabpanel" aria-labelledby="ex1-tab-2">
    Tab 2 content
  </div>
  <div class="tab-pane fade" id="ex1-tabs-3" role="tabpanel" aria-labelledby="ex1-tab-3">
    Tab 3 content
  </div>
</div>
    </React.Fragment>
        )
}

export default Tabs