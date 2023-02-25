import React from 'react'


export default function Newsitem(props) {
    const { title, desc, ImageUrl, NewsUrl, author, date, source } = props;
    return (
      <>
        <div className="card my-2 mx-auto" style={{ width: '22rem' }}>
          <span className="position-absolute translate-middle badge rounded-pill bg-dark p-2" style={{left:'90%',top:'2%'}}>
            {source}
          </span>
          <img src={ImageUrl} className="card-img-top" alt='' style={{ height: '190px' }} />
          <div className="card-body">
            <h5 className="card-title text-justify">{title}..</h5>
            <p className="card-text text-justify">{desc}..</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} <br />Published on {new Date(date).toUTCString()}</small></p>
            <a href={NewsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </>
    )
  }

