import React from 'react'
import './Widgets.css'
import SearchIcon from '@mui/icons-material/Search'


function Widgets() {
  return (
    <div className='widgets'>
        <div className='widgets_input' style={{width:"350px"}}>
          <SearchIcon className='widgets_searchIcon'/>
          <input type='text' placeholder='SearchTwitter'/>
        </div>
        <div className='widgets_widgetContainer' style={{width:"350px"}}>
          <h2>Whats's happening</h2>
          <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Doctors: Googling stuff online does not make you a doctor<br/><br/>Developers: <a href="https://t.co/mrju5ypPkb">pic.twitter.com/mrju5ypPkb</a></p>&mdash; Developers (@XDevelopers) <a href="https://twitter.com/XDevelopers/status/1227640996038684673?ref_src=twsrc%5Etfw">February 12, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Sunsets don&#39;t get much better than this one over <a href="https://twitter.com/GrandTetonNPS?ref_src=twsrc%5Etfw">@GrandTetonNPS</a>. <a href="https://twitter.com/hashtag/nature?src=hash&amp;ref_src=twsrc%5Etfw">#nature</a> <a href="https://twitter.com/hashtag/sunset?src=hash&amp;ref_src=twsrc%5Etfw">#sunset</a> <a href="http://t.co/YuKy2rcjyU">pic.twitter.com/YuKy2rcjyU</a></p>&mdash; US Department of the Interior (@Interior) <a href="https://twitter.com/Interior/status/463440424141459456?ref_src=twsrc%5Etfw">May 5, 2014</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr"><a href="https://twitter.com/WilliamShatner?ref_src=twsrc%5Etfw">@WilliamShatner</a> Good day, Captain. <a href="https://twitter.com/hashtag/ISS?src=hash&amp;ref_src=twsrc%5Etfw">#ISS</a> is in standard orbit and Commander Swanson has the conn. Hope you’re having a great weekend!</p>&mdash; NASA (@NASA) <a href="https://twitter.com/NASA/status/495719809695621121?ref_src=twsrc%5Etfw">August 2, 2014</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <blockquote class="twitter-tweet"><p lang="en" dir="ltr">At dawn from the gateway to Mars, the launch of Starship’s second flight test <a href="https://t.co/ffKnsVKwG4">pic.twitter.com/ffKnsVKwG4</a></p>&mdash; SpaceX (@SpaceX) <a href="https://twitter.com/SpaceX/status/1732824684683784516?ref_src=twsrc%5Etfw">December 7, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
          <a class="twitter-timeline" href="https://twitter.com/XDevelopers?ref_src=twsrc%5Etfw">Tweets by XDevelopers</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    </div>
  )
}

export default Widgets