import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import styled from 'styled-components';

const { Title, Paragraph } = Typography;

// Стили для основного контейнера
const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 500px;
  margin:10px 0;
  border-radius: 12px;
  overflow: hidden;
`;
//383B52

// Левая колонка с кнопками (расширенная до 350px)
const ButtonColumn = styled.div`
  width: 450px;
  background: linear-gradient(135deg,rgb(255, 255, 255) 0%,rgb(255, 255, 255) 100%);
  padding: 30px 20px;
  border-right: 1px solid #e0e0e0;
`;

// Правая колонка с контентом
const ContentColumn = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #383B52;
`;

// Базовые стили для кнопок
const ServiceButton = styled(Button)`
  width: 100%;
  min-height: 70px;
  margin-bottom: 20px;
  padding: 15px;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
  border-radius: 0px;
  border: 1px solid #d9d9d9;

  &:hover {
    border-color:rgb(26, 42, 57) ;
    color:rgb(8, 22, 36) !important; 
  }
`;

// Стили для активной кнопки
const ActiveServiceButton = styled(ServiceButton)`
  background:rgb(36, 55, 71);
  color: white !important;

  &:hover {
    color: #383B52 !important;
    background:rgb(16, 27, 37);
    border-color:rgb(17, 31, 42) !important;
  }
`;

// Стили для контентной области
const ServiceContent = styled.div`
  h2 {
    color:rgb(247, 247, 247);
    margin-bottom: 24px;
    font-size: 28px;
  }

  .subtitle {
    color:rgb(255, 255, 255);
    font-size: 18px;
    margin-bottom: 24px;
    line-height: 1.6;
  }

  ul {
    padding-left: 25px;
  }

  li {
    margin-bottom: 12px;
    font-size: 17px;
    line-height: 1.7;
    color:rgb(255, 255, 255);
  }
`;

const services = [
  {
    id: 'adventure',
    title: 'Активный отдых и приключения',
    subtitle: 'Зимой и летом Эльбрус дарит массу возможностей:',
    items: [
      'Горные лыжи и сноуборд – прокат снаряжения и помощь инструкторов',
      'Треккинг и восхождения – маршруты для новичков и опытных альпинистов',
      'Снегоходы и квадроциклы – захватывающие поездки по склонам',
      'Конные прогулки – живописные тропы с гидом',
      'Парапланеризм – полеты над долинами с опытным пилотом'
    ]
  },
  {
    id: 'excursions',
    title: 'Экскурсии по Кабардино-Балкарии',
    subtitle: 'Откройте для себя красоту региона:',
    items: [
      'Чегемские водопады – мощь и величие природы',
      'Голубые озера – кристально чистая вода невероятного цвета',
      'Термальные источники Аушигера – природный SPA-курорт',
      'Национальные вечера – танцы, музыка и традиционные угощения'
    ]
  },
  {
    id: 'relax',
    title: 'Релакс и восстановление',
    subtitle: 'После активного дня расслабьтесь в нашем SPA-комплексе:',
    items: [
      'Русская баня и финская сауна с ароматными травами',
      'Массажи и обертывания для восстановления сил',
      'Бассейн с подогревом и видом на горы'
    ]
  },
  {
    id: 'special',
    title: 'Для особых случаев',
    items: [
      'Романтические ужины у камина',
      'Организация свадеб и мероприятий в горном стиле',
      'Фотосессии на фоне заснеженных вершин'
    ]
  }
];

const ContentService: React.FC = () => {
  const [activeService, setActiveService] = useState(services[0]);

  return (
    <Container>
      <ButtonColumn>
        {services.map(service => (
          service.id === activeService.id ? (
            <ActiveServiceButton 
              key={service.id}
              onClick={() => setActiveService(service)}
            >
              {service.title}
            </ActiveServiceButton>
          ) : (
            <ServiceButton 
              key={service.id}
              onClick={() => setActiveService(service)}
            >
              {service.title}
            </ServiceButton>
          )
        ))}
      </ButtonColumn>

      <ContentColumn>
        <ServiceContent>
          <Title level={2}>{activeService.title}</Title>
          {activeService.subtitle && (
            <Paragraph className="subtitle">{activeService.subtitle}</Paragraph>
          )}
          <ul>
            {activeService.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </ServiceContent>
      </ContentColumn>
    </Container>
  );
};

export default ContentService;