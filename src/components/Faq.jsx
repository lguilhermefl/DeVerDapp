import styled from 'styled-components'

export default function Faq() {
    const info = [
        {
            title: 'About Vincent de ver',
            description: 'Vincent de ver is a collection inspired by the visual components of art including color, form, line, shape, space, texture, and value. Machine learning was used to build a library for every component separately, and then they were combined in different ways to create each unique work. While properties are assigned to each piece of art in the metadata, the aesthetic value can only be determined by you. '
        },
        {
            title: 'Collection size',
            description: 'There are 1111 Vincent de ver NFTs'
        },
        {
            title: 'Mint Info',
            description: 'Mint price is 0.0075 eth and max of 5 pieces per wallet'
        },
    ]

    const topics = info.map((topic) => 
        <Topic key={topic.title} >
            <Title>{topic.title}</Title>
            <Description>{topic.description}</Description>
        </Topic>
    )
    return (
        <Container>
            {topics}
        </Container>
    )
}

const Container = styled.div`
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    max-width: 1000px;
`

const Topic = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    line-height: 2.2rem;
`

const Title = styled.h2`
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 600;
    @media (min-width: 500px) {
    font-size: 1.7rem;
    line-height: 2.2rem;
  }
  @media (min-width: 768px) {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`

const Description = styled.span`
    font-size: 1.2rem;
    line-height: 1.2;
    font-weight: 300;
    margin-bottom: 1rem;
    @media (min-width: 500px) {
    font-size: 1.3rem;
    line-height: 1.8;
  }
  @media (min-width: 768px) {
    font-size: 1.5;
    line-height: 2rem;
  }
`

