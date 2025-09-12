import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Palette, Video, Music, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import Tooltip from './Tooltip';

type ServiceType = 'images' | 'video' | 'audio' | null;
type ServiceLevel = 'freelancer' | 'agency' | 'diy' | null;

interface ProjectState {
  service: ServiceType;
  level: ServiceLevel;
  imageCount: number;
  imageStyles: number;
  videoDuration: number;
  videoResolution: '1080p' | '4k';
  customAvatar: boolean;
  audioDuration: number;
  audioLicense: 'standard' | 'full';
  priorityExecution: boolean;
  fullRights: boolean;
}

const ProjectCalculator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [project, setProject] = useState<ProjectState>({
    service: null,
    level: null,
    imageCount: 10,
    imageStyles: 3,
    videoDuration: 60,
    videoResolution: '1080p',
    customAvatar: false,
    audioDuration: 120,
    audioLicense: 'standard',
    priorityExecution: false,
    fullRights: false,
  });

  const services = [
    { id: 'images', name: 'AI Изображения / Нейрофотосессия', icon: Palette },
    { id: 'video', name: 'AI Видеопродакшн', icon: Video },
    { id: 'audio', name: 'AI Аудио и Музыка', icon: Music },
  ];

  const levels = [
    { 
      id: 'freelancer', 
      name: 'Уровень Фрилансер', 
      price: '$$',
      description: 'Качественное выполнение проекта с базовым набором услуг'
    },
    { 
      id: 'agency', 
      name: 'Уровень Агентство', 
      price: '$$$$',
      description: 'Премиум качество с полным сопровождением и гарантиями'
    },
    { 
      id: 'diy', 
      name: 'DIY-Ассистент', 
      price: '$',
      description: 'Консалтинг для самостоятельного создания контента'
    },
  ];

  // Auto-activate full rights for agency level or full audio license
  useEffect(() => {
    if (project.level === 'agency' || project.audioLicense === 'full') {
      setProject(prev => ({ ...prev, fullRights: true }));
    }
  }, [project.level, project.audioLicense]);

  // Reset subsequent steps when changing previous choices
  const resetSubsequentSteps = (fromStep: number) => {
    if (fromStep <= 1) {
      setProject(prev => ({ ...prev, level: null }));
      setStep(Math.min(step, 2));
    }
    if (fromStep <= 2) {
      setStep(Math.min(step, 3));
    }
  };

  const calculatePrice = () => {
    if (project.level === 'diy') return 15000;

    let basePrice = 0;
    let additionalCosts = 0;
    let multiplier = 1;

    // Base prices
    if (project.service === 'images') {
      const pricePerImage = project.level === 'freelancer' ? 250 : 7000;
      basePrice = pricePerImage * project.imageCount;
    } else if (project.service === 'video') {
      const pricePerSecond = project.level === 'freelancer' ? 400 : 8000;
      basePrice = pricePerSecond * project.videoDuration;
      
      // 4K multiplier
      if (project.videoResolution === '4k') {
        multiplier *= 1.25;
      }
      
      // Custom avatar
      if (project.customAvatar) {
        additionalCosts += 20000;
      }
    } else if (project.service === 'audio') {
      const pricePerSecond = project.level === 'freelancer' ? 150 : 1500;
      basePrice = pricePerSecond * project.audioDuration;
      
      // Full license multiplier
      if (project.audioLicense === 'full') {
        multiplier *= 2.0;
      }
    }

    let totalPrice = basePrice * multiplier + additionalCosts;

    // Full rights multiplier
    if (project.fullRights) {
      totalPrice *= 1.75;
    }

    // Priority execution multiplier
    if (project.priorityExecution) {
      totalPrice *= 1.5;
    }

    return Math.round(totalPrice);
  };

  const handleGetQuote = () => {
    const selectedOptions = {
      service: services.find(s => s.id === project.service)?.name,
      level: levels.find(l => l.id === project.level)?.name,
      parameters: project.service === 'images' 
        ? `${project.imageCount} изображений, ${project.imageStyles} стилей`
        : project.service === 'video'
        ? `${project.videoDuration}сек, ${project.videoResolution}${project.customAvatar ? ', кастомный аватар' : ''}`
        : `${project.audioDuration}сек, ${project.audioLicense === 'full' ? 'полная передача прав' : 'стандартная лицензия'}`,
      additionalOptions: [
        project.priorityExecution && 'Приоритетное выполнение',
        project.fullRights && 'Полная передача авторских прав'
      ].filter(Boolean),
      totalPrice: calculatePrice()
    };
    
    console.log('Выбранные опции:', selectedOptions);
  };

  const StepHeader: React.FC<{ stepNumber: number; title: string; isCompleted: boolean; summary?: string }> = 
    ({ stepNumber, title, isCompleted, summary }) => (
    <div 
      className={`p-4 border-b border-border/30 cursor-pointer transition-all duration-300 ${
        isCompleted ? 'ai-step-completed' : ''
      }`}
      onClick={() => isCompleted && setStep(stepNumber)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            isCompleted ? 'bg-ai-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          }`}>
            {isCompleted ? <Check className="w-4 h-4" /> : stepNumber}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            {isCompleted && summary && (
              <p className="text-sm text-muted-foreground">{summary}</p>
            )}
          </div>
        </div>
        {isCompleted && (
          step === stepNumber ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
    </div>
  );

  const getServiceSummary = () => {
    const service = services.find(s => s.id === project.service);
    return service ? `Услуга: ${service.name}` : '';
  };

  const getLevelSummary = () => {
    const level = levels.find(l => l.id === project.level);
    return level ? `Уровень: ${level.name}` : '';
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent mb-4">
            Калькулятор AI-проектов
          </h1>
          <p className="text-muted-foreground text-lg">
            Рассчитайте стоимость вашего проекта с искусственным интеллектом
          </p>
        </div>

        <Card className="ai-card overflow-hidden">
          {/* Step 1: Service Selection */}
          <StepHeader 
            stepNumber={1} 
            title="Выбор основной услуги" 
            isCompleted={!!project.service}
            summary={getServiceSummary()}
          />
          {(step === 1 || !project.service) && (
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className={`p-6 cursor-pointer ai-card-hover transition-all duration-300 ${
                        project.service === service.id ? 'ai-card-selected' : 'ai-card'
                      }`}
                      onClick={() => {
                        setProject(prev => ({ ...prev, service: service.id as ServiceType }));
                        resetSubsequentSteps(1);
                        setStep(2);
                      }}
                    >
                      <div className="text-center space-y-3">
                        <Icon className="w-12 h-12 mx-auto text-ai-primary" />
                        <h3 className="font-medium">{service.name}</h3>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Service Level */}
          {project.service && (
            <>
              <StepHeader 
                stepNumber={2} 
                title="Выбор уровня услуги" 
                isCompleted={!!project.level}
                summary={getLevelSummary()}
              />
              {(step === 2 || !project.level) && (
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {levels.map((level) => (
                      <Card
                        key={level.id}
                        className={`p-6 cursor-pointer ai-card-hover transition-all duration-300 ${
                          project.level === level.id ? 'ai-card-selected' : 'ai-card'
                        }`}
                        onClick={() => {
                          setProject(prev => ({ ...prev, level: level.id as ServiceLevel }));
                          resetSubsequentSteps(2);
                          setStep(3);
                        }}
                      >
                        <div className="text-center space-y-3">
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-2xl font-bold text-ai-primary">{level.price}</span>
                            {level.id === 'diy' && (
                              <Tooltip content="Это консалтинг для тех, кто хочет создавать AI-контент самостоятельно, но с помощью эксперта. Мы поможем с идеями, написанием промптов и отбором лучших результатов, а вы будете использовать свои подписки на AI-сервисы." />
                            )}
                          </div>
                          <h3 className="font-medium">{level.name}</h3>
                          <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Step 3: Project Parameters */}
          {project.service && project.level && project.level !== 'diy' && (
            <>
              <StepHeader 
                stepNumber={3} 
                title="Параметры проекта" 
                isCompleted={step > 3}
                summary={step > 3 ? "Параметры настроены" : ""}
              />
              {step === 3 && (
                <div className="p-6 space-y-6">
                  {project.service === 'images' && (
                    <>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Количество изображений: {project.imageCount}</label>
                        <Slider
                          value={[project.imageCount]}
                          onValueChange={(value) => setProject(prev => ({ ...prev, imageCount: value[0] }))}
                          max={50}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Количество уникальных образов/стилей: {project.imageStyles}</label>
                        <Slider
                          value={[project.imageStyles]}
                          onValueChange={(value) => setProject(prev => ({ ...prev, imageStyles: value[0] }))}
                          max={10}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                      </div>
                    </>
                  )}

                  {project.service === 'video' && (
                    <>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Длительность видео (секунд): {project.videoDuration}</label>
                        <Slider
                          value={[project.videoDuration]}
                          onValueChange={(value) => setProject(prev => ({ ...prev, videoDuration: value[0] }))}
                          max={180}
                          min={15}
                          step={5}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Разрешение</label>
                        <Select
                          value={project.videoResolution}
                          onValueChange={(value: '1080p' | '4k') => setProject(prev => ({ ...prev, videoResolution: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                            <SelectItem value="4k">4K (Ultra HD)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="customAvatar"
                          checked={project.customAvatar}
                          onCheckedChange={(checked) => setProject(prev => ({ ...prev, customAvatar: !!checked }))}
                        />
                        <label htmlFor="customAvatar" className="text-sm font-medium cursor-pointer">
                          Кастомный AI-аватар
                        </label>
                      </div>
                    </>
                  )}

                  {project.service === 'audio' && (
                    <>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Длительность трека (секунд): {project.audioDuration}</label>
                        <Slider
                          value={[project.audioDuration]}
                          onValueChange={(value) => setProject(prev => ({ ...prev, audioDuration: value[0] }))}
                          max={240}
                          min={30}
                          step={10}
                          className="w-full"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-sm font-medium">Тип лицензии</label>
                        <Select
                          value={project.audioLicense}
                          onValueChange={(value: 'standard' | 'full') => setProject(prev => ({ ...prev, audioLicense: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Стандартная коммерческая (Веб/Соцсети)</SelectItem>
                            <SelectItem value="full">Полная передача прав</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <Button 
                    onClick={() => setStep(4)}
                    className="w-full ai-button-primary"
                  >
                    Продолжить
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Step 4: Additional Options */}
          {project.service && project.level && (project.level === 'diy' || step > 3) && (
            <>
              <StepHeader 
                stepNumber={4} 
                title="Дополнительные опции" 
                isCompleted={step > 4}
                summary={step > 4 ? "Опции выбраны" : ""}
              />
              {(step === 4 || project.level === 'diy') && (
                <div className="p-6 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priority"
                      checked={project.priorityExecution}
                      onCheckedChange={(checked) => setProject(prev => ({ ...prev, priorityExecution: !!checked }))}
                    />
                    <label htmlFor="priority" className="text-sm font-medium cursor-pointer">
                      Приоритетное выполнение
                    </label>
                    <Tooltip content="Ваш проект получит максимальный приоритет и будет выполнен в кратчайшие возможные сроки. Точный срок будет определен после детального обсуждения." />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fullRights"
                      checked={project.fullRights}
                      onCheckedChange={(checked) => setProject(prev => ({ ...prev, fullRights: !!checked }))}
                      disabled={project.level === 'agency' || project.audioLicense === 'full'}
                    />
                    <label htmlFor="fullRights" className="text-sm font-medium cursor-pointer">
                      Полная передача авторских прав и юридическая защита
                    </label>
                  </div>

                  <Button 
                    onClick={() => setStep(5)}
                    className="w-full ai-button-primary"
                  >
                    Рассчитать стоимость
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Step 5: Final Price */}
          {project.service && project.level && (step > 4 || project.level === 'diy') && (
            <div className="p-6 border-t border-border/30">
              <div className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-lg p-6 space-y-4">
                <h3 className="text-xl font-bold text-center">Расчет стоимости</h3>
                
                {project.level !== 'diy' && (
                  <>
                    <div className="flex justify-between">
                      <span>Базовая стоимость:</span>
                      <span className="font-medium">{calculatePrice() - (project.priorityExecution ? Math.round(calculatePrice() / 1.5 * 0.5) : 0) - (project.fullRights ? Math.round(calculatePrice() / 1.75 * 0.75) : 0)} ₽</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Доп. услуги:</span>
                      <span className="font-medium">{(project.priorityExecution ? Math.round(calculatePrice() / 1.5 * 0.5) : 0) + (project.fullRights ? Math.round(calculatePrice() / 1.75 * 0.75) : 0)} ₽</span>
                    </div>
                  </>
                )}
                
                <div className="border-t border-border/30 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итоговая стоимость:</span>
                    <span className="text-ai-primary">{calculatePrice().toLocaleString()} ₽</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetQuote}
                  className="w-full ai-button-primary text-lg py-3"
                >
                  Получить точный расчет
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ProjectCalculator;