using AutoMapper;
using GymMaster.API.Models;
using GymMaster.API.Models.DTO;

namespace GymMaster.API.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Plan mappings
            CreateMap<Plan, UpdatePlanDto>().ReverseMap();

            // User mappings


            // Subscription mappings
            CreateMap<Subscription, SubscriptionDto>().ReverseMap();
 

            // Payment mappings


            // Feedback mappings

            CreateMap<Feedback, CreateFeedbackDto>().ReverseMap();

            // Trainer mappings
            CreateMap<Trainer, CreateTrainerDto>().ReverseMap();
            CreateMap<Trainer, UpdateTrainerDto>().ReverseMap();

            // Training Session mappings
            CreateMap<TrainningSession, CreateTrainingSessionDto>().ReverseMap();
            CreateMap<TrainningSession, UpdateTrainingSessionDto>().ReverseMap();

            // GymRoom mappings
            CreateMap<GymRoom, UpdateGymRoomDto>().ReverseMap();
            CreateMap<GymRoom, CreateGymRoomDto>().ReverseMap();
            
            //Equipment mappings
            CreateMap<Equipment, CreateEquipmentDto>().ReverseMap();
            CreateMap<Equipment,  UpdateEquipmentDto>().ReverseMap();
        }
    }
} 