import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface DiseaseCardProps {
  disease: {
    id: string;
    title: string;
    description: string;
  };
}

const DiseaseCard: FC<DiseaseCardProps> = ({ disease }) => {
  const navigate = useNavigate();

  const handleDiseaseClick = () => {
    navigate(`/dashboard/disease/${disease.id}`, { state: { disease } });
  };

  return (
    <Card elevation={3}>
      <CardActionArea onClick={handleDiseaseClick}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={{ textAlign: 'center' }}>
            {disease.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DiseaseCard;
